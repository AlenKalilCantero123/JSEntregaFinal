function handlePaymentMethod(method) {
    let title = '';
    let html = '';

    switch (method) {
        case 'paypal':
            title = 'Datos de PayPal';
            html = '<input id="paypal-email" class="swal2-input" placeholder="Correo de PayPal" value="example@example.com">';
            break;
        case 'credit-card':
            title = 'Datos de Tarjeta de Crédito';
            html = `
                <input id="card-number" class="swal2-input" placeholder="Número de Tarjeta" value="4111 1111 1111 1111">
                <input id="card-expiry" class="swal2-input" placeholder="Fecha de Expiración (MM/AA)" value="12/25">
                <input id="card-cvc" class="swal2-input" placeholder="CVC" value="123">
            `;
            break;
        case 'mercado-pago':
            title = 'Datos de Mercado Pago';
            html = `
                <input id="mercado-alias" class="swal2-input" placeholder="Alias" value="alias123">
                <input id="mercado-cvu" class="swal2-input" placeholder="CVU" value="12345678901234567890">
                <input id="mercado-nombre" class="swal2-input" placeholder="Nombre" value="Juan Pérez">
                <input id="mercado-cuil" class="swal2-input" placeholder="CUIL" value="20-12345678-9">
            `;
            break;
        case 'transferencia':
            title = 'Datos de Transferencia Bancaria';
            html = `
                <input id="transferencia-alias" class="swal2-input" placeholder="Alias" value="alias123">
                <input id="transferencia-cbu" class="swal2-input" placeholder="CBU" value="1234567890123456789012">
                <input id="transferencia-nombre" class="swal2-input" placeholder="Nombre" value="Juan Pérez">
                <input id="transferencia-cuil" class="swal2-input" placeholder="CUIL" value="20-12345678-9">
            `;
            break;
        case 'efectivo':
            title = 'Pago en Efectivo';
            html = 'Por favor, acércate a nuestras oficinas de lunes a viernes de 9 a 18 para completar el pago.';
            break;
    }

    Swal.fire({
        title: title,
        html: html,
        confirmButtonText: 'Pagar',
        preConfirm: () => {
            if (method === 'efectivo') {
                return;
            }

            let data = {};
            switch (method) {
                case 'paypal':
                    data.email = document.getElementById('paypal-email').value;
                    break;
                case 'credit-card':
                    data.cardNumber = document.getElementById('card-number').value;
                    data.expiry = document.getElementById('card-expiry').value;
                    data.cvc = document.getElementById('card-cvc').value;
                    break;
                case 'mercado-pago':
                    data.alias = document.getElementById('mercado-alias').value;
                    data.cvu = document.getElementById('mercado-cvu').value;
                    data.nombre = document.getElementById('mercado-nombre').value;
                    data.cuil = document.getElementById('mercado-cuil').value;
                    break;
                case 'transferencia':
                    data.alias = document.getElementById('transferencia-alias').value;
                    data.cbu = document.getElementById('transferencia-cbu').value;
                    data.nombre = document.getElementById('transferencia-nombre').value;
                    data.cuil = document.getElementById('transferencia-cuil').value;
                    break;
            }
            
            // Aquí puedes hacer una llamada para procesar el pago
            console.log('Datos de pago:', data);
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire('Pago realizado con éxito', 'Gracias por tu compra.', 'success');
            clearCart();
        }
    });
}
