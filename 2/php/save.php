<?php 
require 'world_data_parser.php';

$wdp = new WorldDataParser();
$csv = $wdp->parseCSV("../res/world_data_v1.csv");
$xmlStatus = $wdp->saveXML($csv);

if ($xmlStatus === true ){
		echo "XML Saved";
	} else {
		echo "XML Saved error ";
	} 


?>

