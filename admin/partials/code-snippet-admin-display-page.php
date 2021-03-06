<!-- This file should primarily consist of HTML with a little bit of PHP. -->
<div class="wrap">
    <h2><?php esc_html_e('Code Snippet Editor', 'code-snippet-editor' ) ?></h2>
    <div class="wp-pattern-example" >
        <h3><?php esc_html_e( 'Fast track your productivity by testing out your code on the spot', 'code-snippet-editor' ) ?></h3>
        <div class="code-snippet-file-history">
            <div id="code-snippet-editor" style="width: 80%;height: 500px"></div>
            <div class="history" style="margin-left: 10px;width: 18%">
                <h3><?php echo sprintf('%s <a href="#" class="code-snippet-new-file" id="code-snippet-new-tab"><span>%s</span></a>', 
                __('History', 'code-snippet-editor'), 
                __('New', 'code-snippet-editor')) ?></h3>
                <span id="code-snippet-recently-veiwed-file"></span>
                <div class="code-snippet-history">
                    <ul>
                        <?php do_action( 'get_history' ); ?>
                    </ul>
                </div>
            </div>
        </div>
        <p></p>
        <div class="code-snippet-tool-bar">
        <input type="text" id="code-snippet-recent-filename" value="<?php echo get_option( 'code_snippet_last_file_created', 0 ) ?>" />
        <input type="text" id="code-snippet-current-tab" value="0" />
        <button class="button button-primary" id="instant-snippet-execute"><?php esc_html_e( 'Save &amp; Execute', 'code-snippet-editor' ) ?></button>
        <button class="button" id="code-snippet-copy-code"><?php esc_html_e( 'Copy code', 'code-snippet-editor' ) ?></button>
        <select class="input" id="instant-snippet-change-lang">
            <option value="php">PHP</option>
            <option value="sql">SQL</option>
            <option value="javascript">Javascript</option>
        </select>
        <select class="input" id="instant-snippet-change-theme">
            <option value="font size"><?php esc_html_e( 'Theme', 'code-snippet-editor' ) ?></option>
            <option value="chrome">Chrome</option>
            <option value="choas">Choas</option>
            <option value="Dawn">Dawn</option>
        </select>
        <select class="input" id="instant-snippet-font-size">
            <option value="font size"><?php esc_html_e( 'Font size', 'code-snippet-editor' ) ?></option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
        </select>
        <!-- <label> RunTime: <span id="code-snippet-run-time">0.0s</span> </label> -->
        <!-- <label>Performance: High</label> -->
        </div>
        <div class="code-snippet-quick-code"></div>
    </div>

    <?php require_once 'snippet-preview.php';  ?>
</div>
