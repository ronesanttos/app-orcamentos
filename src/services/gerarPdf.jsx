import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";



function gerarPdf(clientes) {
    pdfMake.addVirtualFileSystem(pdfFonts);

    const date = new Date()
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();

    const dateFormat = `${dia}/${mes}/${ano}`

    const titles = [
        {
            table: {
                headerRows: 1,
                widths: ['50%', '50%'],
                body: [
                    [
                        {
                            text: 'Orcamento ' + ano,
                            fontSize: 15,
                            bold: true,
                            margin: [15, 20, 0, 5],
                        },
                        {
                            text: dateFormat,
                            margin: [15, 20, 10, 5],
                            alignment: 'right',
                            fontSize: 10
                        }
                    ]
                ]
            },

            layout: 'noBorders'
        }
    ]

    const details = [
        {
            table: {

                widths: ['20%', '80%',],
                body: [
                    [

                        { text: 'CLIENTE: ', margin: [5, 5, 5, 5], border: [true, true, false, true] }, { text: clientes.name_cliente, margin: [15, 5, 5, 5], border: [false, true, true, true] },
                    ],
                    [
                        { text: 'Endereco', fontSize: 10, style: 'tableHeader', margin: [5, 5, 5, 5] }, { text: clientes.anddress, margin: [15, 5, 5, 5], }
                    ]

                ]
            },
            layout: 'tableExample'

        }
    ];

    function rodape(currentPage, countPage) {
        return [
            {
                text: currentPage + '/' + countPage,
                fontSize: 9,
                alignment: 'right',
                margin: [0, 10, 20, 0]
            }
        ]
    }

    const docDetails = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [titles],
        content: [details],
        footer: rodape
    }

    pdfMake.createPdf(docDetails).open()
}

export default gerarPdf