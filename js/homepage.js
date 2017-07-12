/**
 * 首頁
 *
 * @file
 */

"use strict";


!function() {
    var isPcMode = !~navigator.userAgent.indexOf( 'Mobile' );

    !function() {
        var bodyClassList = document.body.classList;
        var drawId = null;

        if ( isPcMode ) bodyClassList.add( 'onPCDoc' );
        else bodyClassList.add( 'onMobileDoc' );

        document.getElementById( 'readDocList_pcDocButton' )
            .addEventListener( 'click', function () {
                if ( drawId ) cancelAnimationFrame( drawId );

                requestAnimationFrame( function () {
                    drawId = null;
                    bodyClassList.add( 'onPCDoc' );
                    bodyClassList.remove( 'onMobileDoc' );
                } );
            } );

        document.getElementById( 'readDocList_mobileDocButton' )
            .addEventListener( 'click', function () {
                if ( drawId ) cancelAnimationFrame( drawId );

                requestAnimationFrame( function () {
                    drawId = null;
                    bodyClassList.add( 'onMobileDoc' );
                    bodyClassList.remove( 'onPCDoc' );
                } );
            } );
    }();

    // 緩載入圖片
    !function() {
        var substituteImg = URL.createObjectURL( new Blob( [
            '<svg width="96" height="96" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">'
            +  '<circle class="loader_spinner" cx="32" cy="32" r="14"'
            +    ' fill="none" stroke="#FFD306" stroke-width="3px" stroke-dashoffset="48">'
            +    '<animate attributeName="stroke-dasharray"'
            +      ' values="2,85.964;65.973,21.9911;2,85.964" dur="1.6s" repeatCount="indefinite" />'
            +    '<animateTransform attributeName="transform" type="rotate"'
            +      ' values="0,32,32;180,32,32;720,32,32" dur="1.6s" repeatCount="indefinite" />'
            +  '</circle>'
            + '</svg>'
        ], { type: 'image/svg+xml' } ) );

        function lazyloadImg( helItem ) {
            var p, len, helClone, itemSrc;

            itemSrc = helItem.dataset.lazyloadSrc;

            if ( itemSrc ) {
                if ( !helItem.src ) helItem.src = substituteImg;

                helClone = helItem.cloneNode();
                delete helClone.dataset.lazyloadSrc;
                helClone.src = itemSrc;

                function putBack() {
                    helClone.onload = null;
                    helItem.parentNode.insertBefore( helClone, helItem );
                    helItem.remove();
                }

                if ( helClone.complete ) putBack();
                else helClone.onload = putBack;
            }
        }

        var helInstallDoc_pc = document.getElementById( 'installDoc_pc' );
        var helInstallDoc_mobile = document.getElementById( 'installDoc_mobile' );

        if ( isPcMode ) {
            helInstallDoc_pc.querySelectorAll( 'img' ).forEach( lazyloadImg );

            document.getElementById( 'readDocList_mobileDocButton' )
                .addEventListener( 'click', function tem() {
                    this.removeEventListener( 'click', tem );

                    helInstallDoc_mobile.querySelectorAll( 'img' ).forEach( lazyloadImg );
                } );
        } else {
            helInstallDoc_mobile.querySelectorAll( 'img' ).forEach( lazyloadImg );

            document.getElementById( 'readDocList_pcDocButton' )
                .addEventListener( 'click', function tem() {
                    this.removeEventListener( 'click', tem );

                    helInstallDoc_pc.querySelectorAll( 'img' ).forEach( lazyloadImg );
                } );
        }
    }();
}();

