var TableAdvanced = function () {

    var initTable1 = function() {

        /* Formatting function for row details */
        function fnFormatDetails ( oTable, nTr , actualClass)
        {
            var aData = oTable.fnGetData( nTr );

            var sOut = '<table>';

            if(actualClass=='presiembra'){

                //aData[2]

                sOut += '<tr><td>Cultivo Antecesor:</td><td>'+'Soja'+'</td></tr>';
                sOut += '<tr><td>Fecha Cosecha del Cultivo Antecesor:</td><td>'+'12/12/2014'+'</td></tr>';
                sOut += '</table>';


            }else if(actualClass=='ensiembra'){

                sOut += '<tr><td>Tipo Siembra</td><td>'+'Convencional'+'</td></tr>';
                sOut += '<tr><td>Tareas Previas:</td><td> Rotulado, Herbicida, Pre-Emergenta, Pre-Siembra </td></tr>';
                sOut += '</table>';

            }else if(actualClass=='enmanejo'){

                sOut += '<tr><td>Fecha estimada Floración:</td><td>12/12/2014</td></tr>';
                sOut += '</table>';

            }else{
                //cosechado

                sOut += '<tr><td>Rendimiento:</td><td> 2600 kg/ha </td></tr>';
                sOut += '<tr><td>Fecha Cosecha:</td><td> 12/12/2014 </td></tr>';
                sOut += '</table>';

            }

            return sOut;
        }

        /*
         * Insert a 'details' column to the table
         */
        var nCloneTh = document.createElement( 'th' );
        var nCloneTd = document.createElement( 'td' );
        nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

        $('#sample_1 thead tr').each( function () {
            this.insertBefore( nCloneTh, this.childNodes[0] );
        } );

        $('#sample_1 tbody tr').each( function () {
            this.insertBefore(  nCloneTd.cloneNode( true ), this.childNodes[0] );
        } );

        /*
         * Initialize DataTables, with no sorting on the 'details' column
         */
        var oTable = $('#sample_1').dataTable( {
            "processing": true,
            "ajax": "http://agrodatos.app/assets/scripts/test.json",
            "language": {
                "url": "http://agrodatos.app/assets/plugins/data-tables/Spanish.json"
            },
            "columns": [
                {
                    "class":          'row-details',
                    "orderable":      false,
                    "data":           null,
                    "defaultContent": ''
                },
                { "data": "lote" },
                { "data": "estado" },
                { "data": "especie" },
                { "data": "empresa" },
                { "data": "variedad" },
                { "data": "tipo_accion" },
                { "data": "tipo_accion" }
            ],
            "aoColumnDefs": [
                {"bSortable": false, "aTargets": [ 0 ] }
            ],
            "aaSorting": [[1, 'asc']],
             "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 10
        });

        jQuery('#sample_1_wrapper .dataTables_filter input').addClass("form-control input-small"); // modify table search input
        jQuery('#sample_1_wrapper .dataTables_length select').addClass("form-control input-small"); // modify table per page dropdown
        jQuery('#sample_1_wrapper .dataTables_length select').select2(); // initialize select2 dropdown

        /* Add event listener for opening and closing details
         * Note that the indicator for showing which row is open is not controlled by DataTables,
         * rather it is done here
         */
        //$('#sample_1').on('click', ' tbody td .row-details', function () {
        //    var nTr = $(this).parents('tr')[0];
        //
        //    var str = $(this).parents('tr').attr('class');
        //
        //    var actualClass = str.split(' ')[0];
        //
        //
        //    if ( oTable.fnIsOpen(nTr) )
        //    {
        //        /* This row is already open - close it */
        //        $(this).addClass("row-details-close").removeClass("row-details-open");
        //        oTable.fnClose( nTr );
        //    }
        //    else
        //    {
        //        /* Open this row */
        //        $(this).addClass("row-details-open").removeClass("row-details-close");
        //        oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr,actualClass), 'details' );
        //    }
        //});
        $('#sample_1 tbody').on('click', 'td.details-control', function () {
            var tr = $(this).closest('tr');
            var row = table.row( tr );

            if ( row.child.isShown() ) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            }
            else {
                // Open this row
                row.child( format(row.data()) ).show();
                tr.addClass('shown');
            }
        } );

    }

    return {

        //main function to initiate the module
        init: function () {

            if (!jQuery().dataTable) {
                return;
            }

            initTable1();

            //$('#lotes_tb').dataTable( {
            //    "processing": true,
            //    "ajax": "http://agrodatos.app/assets/scripts/test.json",
            //    "columns": [
            //        { "data": "lote" },
            //        { "data": "estado" },
            //        { "data": "especie" },
            //        { "data": "empresa" },
            //        { "data": "variedad" },
            //        { "data": "tipo_accion" }
            //    ]
            //} );

            //$.getJSON( "http://agrodatos.app/assets/scripts/misdatos.json", function( data ) {
            //
            //    var dataSet = data;
            //
            //    $('#sample_1').dataTable( {
            //        "processing": true,
            //        "ajax": "http://agrodatos.app/assets/scripts/misdatos.json",
            //        "columns": [
            //            { "data": "lote" },
            //            { "data": "lote" },
            //            { "data": "lote" },
            //            { "data": "lote" },
            //            { "data": "lote" },
            //            { "data": "lote" }
            //        ]
            //    } );
            //
            //});

        }

    };

}();



/* Formatting function for row details - modify as you need */
function format ( d ) {

    var result = '';

    if(d.estado=='Pre-Siembra'){

        result = '<table style="padding-left:50px;margin-top:-8px;">'+
        '<tr>'+
        '<td>Cultivo Antecesor:</td>'+
        '<td>'+d.extra[0].cultivo_antecesor+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Fecha de Cosecha del Cultivo Antecesor:</td>'+
        '<td>'+d.extra[0].fecha_cultivo_antecesor+'</td>'+
        '</tr>'+
        '</table>';

    }else if(d.estado=='En Siembra'){

        var tareas = '';

        var total = d.extra[0].tareas_previas.length;

        $.each(d.extra[0].tareas_previas,function(i,el)
        {
            if (i === total - 1) {
                tareas = tareas + ' ' +el;
            }else{
                tareas = tareas +el  + ', ';
            }

        });

        result = '<table style="padding-left:50px;margin-top:-8px;">'+
        '<tr>'+
        '<td>Tipo Siembra:</td>'+
        '<td>'+d.extra[0].tipo_siembra+'</td>'+
        '</tr>'+
        '<tr>'+
        '<td>Tareas Previas:</td>'+
        '<td>'+tareas+'</td>'+
        '</tr>'+
        '</table>';

    }else if(d.estado=='En Manejo'){

        result = '<table style="padding-left:50px;margin-top:-8px;">'+
        '<tr>'+
        '<td>Fecha Estimada de Floración:</td>'+
        '<td>'+d.extra[0].fecha_estimada_floracion+'</td>'+
        '</tr>'+
        '</table>';

    }else{

        //Cosechada

        result = '<table style="padding-left:50px;margin-top:-8px;">'+
        '<tr>'+
        '<td>Rendimiento:</td>'+
        '<td>'+d.extra[0].rendimiento+' kg/ha</td>'+
        '</tr>'+
        '<td>Fecha de Cosecha:</td>'+
        '<td>'+d.extra[0].fecha_cosecha+'</td>'+
        '</tr>'+
        '</table>';

    }

    return result;
}

$(document).ready(function() {



    var table = $('#example').DataTable( {
        "ajax": "http://agrodatos.app/assets/scripts/test.json",
        "language": {
            "url": "http://agrodatos.app/assets/plugins/data-tables/Spanish.json"
        },
        "columns": [
            {
                "class":          'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "lote" },
            { "data": "estado" },
            { "data": "especie" },
            { "data": "empresa" },
            { "data": "variedad" },
            {
                "data": "tipo_accion",
                "render": function ( data, type, row ) {
                    //if(data!=''){
                    //    //return '<a href="lote/'+row.id_lote+'/'+data.toLowerCase()+'" class="btn default btn-block btn-'+data+'">'+data+'</a>';
                    //    return '<a href="lote/'+row.id_lote+'/'+data.toLowerCase()+'" class="btn default btn-block btn-'+data+'">'+data+'</a>';
                    //}

                    if(data=='Sembrar'){

                        return '<a href="datosDeSiembra.html" class="btn default btn-block btn-'+data+'">'+data+'</a>';

                    }else if(data=='Manejar'){

                        return '<a href="manejo.html" class="btn default btn-block btn-'+data+'">'+data+'</a>';

                    }else if(data=='Cosechar'){

                        return '<a href="cosecha.html" class="btn default btn-block btn-'+data+'">'+data+'</a>';

                    }

                    return '';
                },
                "targets": 6
            },
            {
                "data": "tipo_alerta",
                "render": function ( data, type, row ) {

                    var btn = '';

                    if(data=='roja'){
                        btn = '<button class="btn red btn-block" data-toggle="modal" href="#modalAlerta"><i class="icon-exclamation-sign"></i> Ver Alerta</button>';
                    }else if(data=='naranja'){
                        btn = '<button class="btn orange btn-block" data-toggle="modal" href="#modalAlerta"><i class="icon-exclamation-sign"></i> Ver Alerta</button>';
                    }else if(data=='amarillo'){
                        btn = '<button class="btn yellow-intense btn-block" data-toggle="modal" href="#modalAlerta"><i class="icon-exclamation-sign"></i> Ver Alerta</button>';
                    }


                    return btn;
                },
                "targets": 7
            }
        ],
        "order": [[1, 'asc']]
    } );

    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );

        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

} );
