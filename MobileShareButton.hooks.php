<?php

namespace MediaWiki\Extension\MobileShareButton;

class Hooks {

	public static function onBeforePageDisplayMobile( $out, $skin ) {
		$out->addModules( 'mobile.sharebutton' );
		echo "";
	}

}
