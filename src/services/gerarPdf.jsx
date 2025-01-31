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
                            margin: [15, 20, 20, 5],
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

                        { text: 'CLIENTE: ', margin: [5, 5, 5, 5], fillColor: 'burlywood' }, { text: clientes.name_cliente, margin: [15, 5, 5, 5] }
                    ],
                    [
                        { text: 'ENDEREÇO:', style: 'tableHeader', fillColor: 'burlywood', margin: [5, 5, 5, 5] }, { text: clientes.anddress, margin: [15, 5, 5, 5], }
                    ],
                    [

                        { text: 'CONTATO: ', margin: [5, 5, 5, 5], fillColor: 'burlywood' }, { text: clientes.contact, margin: [15, 5, 5, 5] }
                    ],
                    [

                        { text: 'SERVIÇO: ', margin: [5, 5, 5, 5], fillColor: 'burlywood' }, { text: clientes.service, margin: [15, 5, 5, 5] }
                    ],
                    [

                        { text: 'DESCRIÇÃO: ', margin: [5, 5, 5, 5],fillColor:'burlywood' }, { text: clientes.details, margin: [15, 5, 5, 5]}
                    ],
                    [

                        { text: 'VALOR: ', margin: [5, 5, 5, 5],fillColor:'burlywood' }, { text: clientes.unit_price * clientes.qtd, margin: [15, 5, 5, 5]}
                    ],
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

    pdfMake.createPdf(docDetails).download(clientes.name_cliente + '.pdf')
}

export default gerarPdf