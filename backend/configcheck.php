<?php
$dir = __DIR__.'/config';
foreach (glob($dir.'/*.php') as $file) {
    $name = basename($file);
    try {
        $value = require $file;
        echo $name.': '.gettype($value)."\n";
        if (!is_array($value)) {
            echo 'BAD '.$name."\n";
        }
    } catch (Throwable $e) {
        echo 'ERROR '.$name.': '.get_class($e).' - '.$e->getMessage()."\n";
    }
}
