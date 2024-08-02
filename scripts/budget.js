const cartItems = [];
let cartTotal = 0;
let selectedPack = null;

// Función para seleccionar un pack
function selectPack(element) {
    const packName = element.getAttribute('data-name');
    const packPrice = parseInt(element.getAttribute('data-price'));

    // Deseleccionar el pack si se vuelve a hacer clic
    if (selectedPack === packName) {
        selectedPack = null;
        cartItems.length = 0;  // Vaciar el carrito ya que no hay selección
        clearHourSelections(); // Limpiar selecciones de horas
        updateCart();
        Swal.fire('Pack deseleccionado', `Has deseleccionado el ${packName}.`, 'info');
        return;
    }

    // Eliminar el pack previamente seleccionado si existe
    if (selectedPack) {
        const previousPackElement = document.querySelector(`.card[data-name="${selectedPack}"]`);
        if (previousPackElement) {
            previousPackElement.classList.remove('selected');
        }
        cartItems.length = 0; // Vaciar el carrito ya que no se puede tener más de un pack
        Swal.fire('Error', `Usted ya seleccionó el ${selectedPack}. Debe deseleccionarlo antes de elegir otro.`, 'warning');
        return;
    }

    // Seleccionar el nuevo pack
    selectedPack = packName;
    cartItems.push({ name: packName, price: packPrice });
    element.classList.add('selected');
    Swal.fire('Pack seleccionado', `Has seleccionado el ${packName}.`, 'success');

    // Limpiar las selecciones de horas
    clearHourSelections();

    updateCart();
}

// Función para actualizar el precio de los servicios personalizados
function updateCustomPrice(serviceName, inputElement) {
    // Solo permitir si no se ha seleccionado un pack
    if (selectedPack) {
        Swal.fire('Error', 'No puedes seleccionar horas mientras tienes un pack seleccionado.', 'error');
        inputElement.value = '';
        return;
    }

    const servicePricePerHour = parseInt(inputElement.closest('.card').getAttribute('data-price'));
    const hours = parseInt(inputElement.value);
    const serviceTotalPrice = servicePricePerHour * hours;

    const existingServiceIndex = cartItems.findIndex(item => item.name === serviceName);

    if (existingServiceIndex !== -1) {
        cartItems[existingServiceIndex].price = serviceTotalPrice;
    } else {
        cartItems.push({ name: serviceName, price: serviceTotalPrice });
    }

    updateCart();
}

// Función para actualizar servicios extra
function updateExtraServices() {
    if (selectedPack) {
        Swal.fire('Error', 'No puedes seleccionar servicios extra mientras tienes un pack seleccionado.', 'error');
        return;
    }

    const photoAerialYes = document.getElementById('photo-aerial-yes');
    const photoAerialNo = document.getElementById('photo-aerial-no');
    const videoAerialYes = document.getElementById('video-aerial-yes');
    const videoAerialNo = document.getElementById('video-aerial-no');
    const videoRecapYes = document.getElementById('video-recap-yes');
    const videoRecapNo = document.getElementById('video-recap-no');

    updateService(photoAerialYes, 30000);
    updateService(photoAerialNo, 0);
    updateService(videoAerialYes, 40000);
    updateService(videoAerialNo, 0);
    updateService(videoRecapYes, 20000);
    updateService(videoRecapNo, 0);
}

function updateService(serviceElement, servicePrice) {
    const serviceName = serviceElement.id.replace(/-/g, ' ').toUpperCase();

    if (serviceElement.checked) {
        if (!cartItems.find(item => item.name === serviceName)) {
            cartItems.push({ name: serviceName, price: servicePrice });
        }
    } else {
        const existingServiceIndex = cartItems.findIndex(item => item.name === serviceName);

        if (existingServiceIndex !== -1) {
            cartItems.splice(existingServiceIndex, 1);
        }
    }

    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name}: $${item.price}`;
        itemElement.addEventListener('click', () => removeCartItem(item.name));
        cartItemsContainer.appendChild(itemElement);
    });

    document.getElementById('cart-total').textContent = `Total: $${cartTotal}`;
}

// Función para eliminar un artículo del carrito
function removeCartItem(itemName) {
    const itemIndex = cartItems.findIndex(item => item.name === itemName);

    if (itemIndex !== -1) {
        cartItems.splice(itemIndex, 1);
        updateCart();
    }
}

// Función para vaciar el carrito
function clearCart() {
    cartItems.length = 0;
    selectedPack = null;
    updateCart();
    // Limpiar selección de packs en el DOM
    document.querySelectorAll('.card.selected').forEach(card => card.classList.remove('selected'));
}

// Función para limpiar la selección de horas si se selecciona un pack
function clearHourSelections() {
    document.querySelectorAll('.card-container .card input[type="number"]').forEach(input => {
        input.value = '';
    });

    document.querySelectorAll('.extra-services input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
}

// Función para confirmar la compra y generar la factura
async function confirmPurchase() {
    if (cartItems.length === 0) {
        Swal.fire('Error', 'El carrito está vacío. Selecciona al menos un servicio antes de confirmar la compra.', 'warning');
        return;
    }

    // Seleccionar el método de pago
    const { value: paymentMethod } = await Swal.fire({
        title: 'Selecciona un Método de Pago',
        input: 'select',
        inputOptions: {
            'paypal': 'PayPal',
            'credit-card': 'Tarjeta de Crédito',
            'mercado-pago': 'Mercado Pago',
            'transferencia': 'Transferencia Bancaria',
            'efectivo': 'Efectivo'
        },
        inputPlaceholder: 'Selecciona un método',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            return new Promise((resolve) => {
                if (value) {
                    resolve();
                } else {
                    resolve('Debes seleccionar un método de pago');
                }
            });
        }
    });

    if (paymentMethod) {
        await handlePaymentMethod(paymentMethod); // Asegúrate de que `handlePaymentMethod` sea asíncrona
        generatePDF(paymentMethod); // Llama a `generatePDF` con el método de pago
    }
}

// Función para actualizar la fecha estimada
function updateDateEstimate(inputElement) {
    const selectedDate = new Date(inputElement.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
        Swal.fire('Error', 'Las reservas deben hacerse con más de 24 horas de anticipación.', 'error');
        inputElement.value = '';
        return;
    }

    const daysUntilEvent = Math.ceil((selectedDate - currentDate) / (1000 * 60 * 60 * 24));

    let dateAdjustment = 0;
    if (daysUntilEvent <= 3) {
        dateAdjustment = 0.5;
        Swal.fire('Recargo aplicado', 'Como la fecha está dentro de 3 días o menos, se aplica un recargo del 50%.', 'info');
    } else if (daysUntilEvent <= 7) {
        dateAdjustment = 0.2;
        Swal.fire('Recargo aplicado', 'Como la fecha está dentro de más de 3 días pero menos de 7, se aplica un recargo del 20%.', 'info');
    }

    cartTotal += cartTotal * dateAdjustment;
    document.getElementById('cart-total').textContent = `Total: $${cartTotal.toFixed(2)}`;
}
