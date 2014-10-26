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
        $('#sample_1').on('click', ' tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];

            var str = $(this).parents('tr').attr('class');

            var actualClass = str.split(' ')[0];


            if ( oTable.fnIsOpen(nTr) )
            {
                /* This row is already open - close it */
                $(this).addClass("row-details-close").removeClass("row-details-open");
                oTable.fnClose( nTr );
            }
            else
            {
                /* Open this row */                
                $(this).addClass("row-details-open").removeClass("row-details-close");
                oTable.fnOpen( nTr, fnFormatDetails(oTable, nTr,actualClass), 'details' );
            }
        });
    }

    return {

        //main function to initiate the module
        init: function () {
            
            if (!jQuery().dataTable) {
                return;
            }

            initTable1();
        }

    };

}();