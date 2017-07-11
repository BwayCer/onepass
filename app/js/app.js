/**
 * 應用程式通用腳本
 *
 * @file
 */

"use strict";


!function() {
    var baseLength = parseInt( getComputedStyle( document.querySelector('html') ).fontSize );

    document.body.onselectstart= function() { return false; };

    // 置頂橫幅
    window.onscroll = function () {
        var scrollY = window.scrollY;

        fixedTopLayer( scrollY );
    };

    var helTopLayer = document.querySelector( '.topLayer' );

    function fixedTopLayer( numScrollY ) {
        numScrollY = numScrollY || window.scrollY;

        var status = fixedTopLayer.status;
        var drawId = fixedTopLayer.drawId;

        if ( helTopLayer.offsetHeight > scrollY === status ) {
            if ( drawId ) cancelAnimationFrame( drawId );

            fixedTopLayer.drawId = requestAnimationFrame( function () {
                fixedTopLayer.drawId = null;

                fixedTopLayer.status = !status;
                helTopLayer.classList.toggle( 'onFixed' );
            } );
        }
    }

    fixedTopLayer.status = false;
    fixedTopLayer.drawId = null;
}();

