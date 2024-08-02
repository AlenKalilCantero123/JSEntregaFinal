async function generatePDF(paymentMethod) {
    try {
        // Cargar jsPDF correctamente
        const { jsPDF } = window.jspdf;

        // Verificar si jsPDF está disponible
        if (!jsPDF) {
            console.error('jsPDF no está disponible');
            return;
        }

        // Crear un nuevo documento PDF
        const doc = new jsPDF();

        // Configurar el título y la información básica de la factura
        doc.setFontSize(16);
        doc.text('Factura', 14, 20);

        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 30);
        
        // Obtener y mostrar el método de pago seleccionado
        const paymentMethodText = {
            'paypal': 'PayPal',
            'credit-card': 'Tarjeta de Crédito',
            'mercado-pago': 'Mercado Pago',
            'transferencia': 'Transferencia Bancaria',
            'efectivo': 'Efectivo'
        }[paymentMethod];

        doc.text(`Método de Pago: ${paymentMethodText}`, 14, 40);

        // Agregar encabezado de servicios
        doc.text('Servicios:', 14, 50);

        // Variables de control para el espaciado del texto
        let yOffset = 60;
        let pageNumber = 1;

        // Agregar cada servicio del carrito al documento PDF
        cartItems.forEach((item, index) => {
            // Si la posición vertical alcanza el límite de la página, crear una nueva página
            if (yOffset > 270) {
                doc.text(`Página ${pageNumber}`, 190, 290); // Número de página
                doc.addPage(); // Crear nueva página
                yOffset = 20; // Reiniciar la posición vertical
                pageNumber++; // Incrementar el número de página
            }
            // Añadir el texto del servicio al documento
            doc.text(`${item.name}: $${item.price.toLocaleString()}`, 14, yOffset);
            yOffset += 10; // Incrementar la posición vertical
        });

        // Añadir el total al final de la lista de servicios
        doc.setFontSize(14);
        doc.text(`Total: $${cartTotal.toLocaleString()}`, 14, yOffset);

        // Descargar el PDF con el nombre especificado
        doc.save('factura.pdf');
    } catch (error) {
        console.error('Error al generar el PDF:', error);
    }
}
