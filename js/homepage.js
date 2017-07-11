/**
 * 首頁
 *
 * @file
 */

"use strict";


!function() {
    !function() {
        var parentClassList = document.getElementById( 'readDocList' ).classList;
        var drawId = null;

        function modeSwitch( mode ) {
            var fnDraw;

            if ( drawId ) cancelAnimationFrame( drawId );

            switch ( mode ) {
                case 'PC':
                    fnDraw = function () {
                        drawId = null;
                        parentClassList.add( 'onPCDoc' );
                        parentClassList.remove( 'onMobileDoc' );
                    };
                    break;
                case 'Mobile':
                    fnDraw = function () {
                        drawId = null;
                        parentClassList.add( 'onMobileDoc' );
                        parentClassList.remove( 'onPCDoc' );
                    };
                    break;
            }

            requestAnimationFrame( fnDraw );
        }

        document.getElementById( 'readDocList_pcDocButton' )
            .addEventListener( 'click', function () {
                modeSwitch( 'PC' );
            } );

        document.getElementById( 'readDocList_mobileDocButton' )
            .addEventListener( 'click', function () {
                modeSwitch( 'Mobile' );
            } );
    }();
}();

