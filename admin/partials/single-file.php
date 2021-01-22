<li data-file="<?php echo $entry ?>">
    <a href="#" class="code-snippet-delete-file" data-file="<?php echo $entry ?>"><span>&times;</span></a>

    <a href="#" style="text-decoration: none;" class="open-recent-file" data-id="<?php echo $key ?>" data-file="<?php echo $entry ?>">
        <h3 style="padding-top: 0px;margin: 0px;"> <?php echo $entry ?> 
        </h3>
        <p>
            <small>Modified: <?php echo date('d-m-y h:ia', filemtime( $dir . '/'. $entry )) ?></small>
        </p>
    </a>
</li>