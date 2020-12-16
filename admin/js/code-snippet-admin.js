(function ($, ace) {
  'use strict';
  /**
   * All of the code for your admin-facing JavaScript source
   * should reside in this file.
   *
   * Note: It has been assumed you will write jQuery code here, so the
   * $ function reference has been prepared for usage within the scope
   * of this function.
   *
   * This enables you to define handlers, for when the DOM is ready:
   *
   * $(function() {
   *
   * });
   *
   * When the window is loaded:
   *
   * $( window ).load(function() {
   *
   * });
   *
   * ...and/or other possibilities.
   *
   * Ideally, it is not considered best practise to attach more than a
   * single DOM-ready or window-load handler for a particular page.
   * Although scripts in the WordPress core, Plugins and Themes may be
   * practising this, we should strive to set a better example in our own work.
   */
  // jQuery(document).ready(function ($){
  const CodeSnippetEditor = {};
  const ACE_LIB = ace.edit('code-snippet-editor');
  const FILE_NAME = 'Untitled';

  CodeSnippetEditor.init = function () {
    this.dispatchFont();
    this.dispatchTheme();
    this.dispatchDelete();
    this.dispatchOpenFile();
    this.setAceDefaultConfig();
    this.dispatchCodePreview();
    this.dispatchSnippetLabel();
    this.dispatchCodeExecution();
    this.dispatchChangeLanguage();
    this.dispatchCodeSnippetList();
    this.dispatchCreateNewSnippet();
    this.dispatchCopyToClipboard();
    //hide output on page load
    this.DOM.output.hide();
  };

  CodeSnippetEditor.getThemes = [
    'dawn',
    'chrome',
    'github',
    'dracula',
    'gob',
    'gruvbox',
    'idle_fingers',
    'monokai',
    'nord_dark',
    'solarized_dark',
    'sqlserver',
  ];

  CodeSnippetEditor.getCodeSnippet = {
    get_posts: '$posts = get_posts( 1 );\n\n var_dump( $posts );',
    action:
      "add_action( 'sample_action' , static function(){\n\techo 'Silence is golden';\n});\n\n//call action\ndo_action( 'sample_action' );",
    filters:
      "add_filter( 'sample_filter' , static function(){\n\techo 'Silence is golden';\n});\n\n//call filters\napply_filters( 'sample_filter' );",
    get_userdata: '$user = get_userdata( 10 );\n\n//output\nvar_dump( $user );',
    get_users:
      "$users = get_users( [ 'role__in' => [ 'author', 'subscriber' ] ] );\n\nforeach( $users as $user ) {\n\techo '<span>' . esc_html( $user->display_name ) . '</span>';\n}",
    shortcode:
      "add_shortcode( 'sample_shortcode', static function() {\n\treturn 'Silence is golden';\n});\n\necho do_shortcode( '[sample_shortcode]' );",
    user_meta:
      "global $current_user;\n\nget_currentuserinfo();\n$userMeta = get_user_meta( $current_user->ID, 'sample_meta_key', true );\nvar_dump( $userMeta );\n\n$create_or_update = update_user_meta( $current_user->ID, 'sample_meta_key', 'sample_meta_value' );",
    option:
      "echo get_option( 'sample_option_key', 0 );\n\n //store option\nupdate_option( 'sample_option_key', 'sample_option_value' );",
    terms:
      "$terms = get_terms( array( 'taxonomy' => 'tax_name', 'parent' => 0 ) );\n\nvar_dump( $terms );",
  };

  CodeSnippetEditor.DOM = {
    output: $('#instant-snippet-output'),
    font: $('#instant-snippet-font-size'),
    file_history: $('.code-snippet-history'),
    open_recent_file: $('.open-recent-file'),
    copy_button: $('#code-snippet-copy-code'),
    theme: $('#instant-snippet-change-theme'),
    create_new_tab: $('#code-snippet-new-tab'),
    current_tab: $('#code-snippet-current-tab'),
    language: $('#instant-snippet-change-lang'),
    delete_file: $('#code-snippet-delete-file'),
    preview_pane: $('#code-snippet-preview-pane'),
    snippet_toolbar: $('.code-snippet-quick-code'),
    execution_button: $('#instant-snippet-execute'),
    recent_filename: $('#code-snippet-recent-filename'),
    recent_files: $('#code-snippet-recently-veiwed-file'),
    snippet_toolbar_button: $('.code-snippet-quick-code label'),
  };

  CodeSnippetEditor.ACTIONS = {
    code_execution: 'code_snippet_execution',
    run_time: 'code_snippet_run_time',
  };

  CodeSnippetEditor.setAceDefaultConfig = function () {
    ACE_LIB.setTheme('ace/theme/monokai');
    ACE_LIB.session.setMode('ace/mode/php');
  };

  CodeSnippetEditor.setTheme = function () {
    const themes = this.getThemes;
    let setOptionElement = '';
    for (let theme of themes) {
      setOptionElement += `<option value="${theme}">${theme}</option>`;
    }
    return setOptionElement;
  };

  CodeSnippetEditor.dispatchTheme = function () {
    const themes = this.setTheme();
    this.DOM.theme.html(themes);

    this.DOM.theme.on('change', function () {
      const theme = $(this).val() === undefined ? 'monokai' : $(this).val();
      ACE_LIB.setTheme(`ace/theme/${theme}`);
    });
  };

  CodeSnippetEditor.dispatchFont = function () {
    this.DOM.font.on('change', function () {
      let size = $(this).val() === undefined ? 13 : $(this).val();
      let sizeToNumber = parseInt(size);
      ACE_LIB.setFontSize(sizeToNumber);
    });
  };

  CodeSnippetEditor.dispatchCodeSnippetList = function () {
    let setSnippetCommands = '';
    const codeSnippet = this.getCodeSnippet;
    let snippetKeys = Object.keys(codeSnippet);
    for (let snippet of snippetKeys) {
      setSnippetCommands += `<label data-code="${codeSnippet[snippet]}"> ${snippet}</label>`;
    }
    this.DOM.snippet_toolbar.append(setSnippetCommands);
  };

  CodeSnippetEditor.dispatchChangeLanguage = function () {
    const that = this;
    this.DOM.language.on('change', function () {
      const getLanguage = $(this).val() === undefined ? 'php' : $(this).val();
      switch (getLanguage) {
        case 'sql':
          that.setPhp();
          break;
        case 'javascript':
          that.setJavascript();
          break;
        default:
          that.setDefault();
          ACE_LIB.session.setMode(`ace/mode/php`);
          break;
      }
    });
  };
  CodeSnippetEditor.setAction = function () {
    let command = '<?php \n\n$posts = get_posts(1);\n\n var_dump($posts);';
    ACE_LIB.session.setValue(command);
  };
  CodeSnippetEditor.setDefault = function () {
    let command = '<?php \n\n//Silence is golden';
    ACE_LIB.session.setValue(command);
  };

  CodeSnippetEditor.setPhp = function () {
    let command = '<?php \n\n// $wpdb db class model \n global $wpdb;';
    command +=
      "\n\n//Write your SQL here\n$query = 'SELECT * FROM wp_posts LIMIT 1';";
    command += '\n$results = $wpdb->get_results($query);';
    command += '\nvar_dump($results);';
    ACE_LIB.session.setValue(command);
  };

  CodeSnippetEditor.setJavascript = function () {
    let command = '<!doctype html>\n';
    command += '<html>\n\t<head>\n\t<title>' + FILE_NAME + '</title>\n';
    command += '\n\t\t<script>\n';
    command += "\t\t\tconsole.log('Silence is golden');";
    command += '\n\t\t</script>\n';
    command += '\t</head>\n<body>\n\t<h2>Hello world</h2>\n';
    command += '</body>\n</html>';
    ACE_LIB.session.setValue(command);
    ACE_LIB.session.setMode('ace/mode/html');
  };

  CodeSnippetEditor.dispatchSnippetLabel = function () {
    const that = this;
    this.DOM.snippet_toolbar.find('label').on('click', function (e) {
      e.preventDefault();
      const getData = $(this).data('code');
      that.DOM.current_tab.val('0');
      const data = `<?php\n\n${getData}`;
      ACE_LIB.getSession().setValue(data);
    });
  };

  CodeSnippetEditor.createFile = function (filename) {
    const fileName = filename + '.php';
    const getElementAttr = this.getFileAttribute();
    if (getElementAttr.indexOf(fileName) === -1) {
      let el = `<li data-file="${filename}"><a href="#" id="code-snippet-delete-file" data-file="${filename}"><span>&times;</span></a>
				<a href="#" style="text-decoration: none;" class="open-recent-file" data-id="${filename}" data-file="${filename}">
				<h3 style="padding-top: 0px;margin: 0px;">${filename}</h3>
				<p>
					<small>Modified: -- </small>
				</p>
      </a></li>`;
      this.DOM.file_history.find('ul').prepend(el);
    }
  };

  CodeSnippetEditor.getFileAttribute = function () {
    const history = this.DOM.file_history.find('ul');
    const children = history.children();
    let setAttribute = [];
    for (let child of children) {
      setAttribute.push(child.getAttribute('data-file').trim());
    }
    return setAttribute;
  };

  CodeSnippetEditor.dispatchCodeExecution = function () {
    const that = this;
    this.DOM.execution_button.on('click', function () {
      const filename = that.getNewFileName();
      const payload = {
        tab: filename.tabIndex,
        filename: filename.title,
        action: that.ACTIONS.code_execution,
        code: ACE_LIB.getSession().getValue(),
      };
      const formatElement = `<i>${FILE_NAME}${filename.tabIndex}</i>`;
      that.DOM.recent_files.html(formatElement);
      that.DOM.recent_filename.val(filename.tabIndex);
      that.createFile(filename.title);
      that
        .ajax(payload)
        .success(function (resp) {
          that.DOM.output.slideDown().html(resp);
        })
        .error(function (err) {
          that.DOM.output.slideDown().html('').html(err.responseText);
        });

      // that.dispatchCodeRunTime(filename);
    });
  };

  // CodeSnippetEditor.dispatchCodeRunTime = function (filename) {
  //   this.ajax({
  //     action: 'code_snippet_run_time',
  //     filename: filename.title,
  //   })
  //     .success(function (resp) {
  //       const elem = resp.split('code_snippet_time:');
  //       const runTime = elem[1] === undefined ? 0 : elem[1];
  //       // this.DOM.run_time.html();
  //       $('#code-snippet-run-time').html(`${parseFloat(runTime).toFixed(3)}s`);
  //     })
  //     .error(function (err) {
  //       $('#instant-snippet-output')
  //         .slideDown()
  //         .html('')
  //         .html(err.responseText);
  //     });
  // };

  CodeSnippetEditor.getNewFileName = function () {
    ACE_LIB.getSession().getValue();
    let lastFile = this.DOM.recent_filename.val();
    let tabChanger = this.DOM.current_tab.val();
    let fileIndexNumber =
      tabChanger === '0' ? parseInt(lastFile) + 1 : tabChanger;
    return { title: FILE_NAME + fileIndexNumber, tabIndex: fileIndexNumber };
  };

  CodeSnippetEditor.dispatchNewTab = function () {
    const that = this;
    this.DOM.create_new_tab = function (e) {
      e.preventDefault();
      let lastFile = that.DOM.recent_filename.val();

      let newTab =
        isNaN(lastFile) || lastFile === 0 ? 1 : parseInt(lastFile) + 1;
      let newTabTitle = FILE_NAME + newTab;
      that.DOM.recent_filename.val(newTab);

      //clear screen
      ACE_LIB.getSession().setValue('');
      that.DOM.recent_files.that.DOM.html(`<i>${newTabTitle}</i>`);
    };
  };

  CodeSnippetEditor.dispatchCreateNewSnippet = function () {
    const that = this;
    this.DOM.create_new_tab.on('click', function (e) {
      e.preventDefault();
      let lastFile = that.DOM.recent_filename.val();
      let newTabIndexNumber =
        isNaN(lastFile) || lastFile === 0 ? 1 : parseInt(lastFile) + 1;
      const newTabTitle = `<i>${FILE_NAME}${newTabIndexNumber}</i>`;
      that.DOM.recent_filename.val(newTabIndexNumber);
      that.DOM.recent_files.html(newTabTitle);

      // generate new file
      const ajaxData = {
        code: ACE_LIB.getSession().setValue(''),
        tab: newTabIndexNumber,
        action: that.ACTIONS.code_execution,
        filename: newTabTitle,
      };

      that
        .ajax(ajaxData)
        .success(function (resp) {
          that.DOM.output.slideDown().html('');
        })
        .error(function (err) {
          console.log(err.responseText);
        });
    });
  };

  CodeSnippetEditor.ajax = function (payload) {
    return $.ajax({
      url: ajaxurl,
      data: payload,
      method: 'POST',
    });
  };

  CodeSnippetEditor.dispatchOpenFile = function () {
    const that = this;
    this.DOM.open_recent_file.on('click', function (e) {
      e.preventDefault();
      const filename = $(this).data('file');
      const payload = {
        filename: filename,
        action: 'code_open_existing_file',
      };

      that
        .ajax(payload)
        .success((response) => {
          ACE_LIB.getSession().setValue(response);
          const tabNumber = filename.match(/\d/g);
          const index = tabNumber.join('');
          const fileTitle = `<i>${filename}</i>`;
          that.DOM.current_tab.val(index);
          that.DOM.recent_files.html(fileTitle);
        })
        .error((err) => {
          console.log(err);
        });
    });
  };

  CodeSnippetEditor.dispatchDelete = function () {
    const that = this;
    this.DOM.delete_file.on('click', function (e) {
      e.preventDefault();
      const filename = $(this).data('file');
      if (window.confirm(`Are you sure you want to delete ${filename}?`)) {
        const data = {
          filename: filename,
          action: 'code_snippet_delete_file',
        };

        const _that = $(this);
        that
          .ajax(data)
          .success((response) => {
            if (response === 'deleted') {
              alert(filename + ' is Deleted !');
              _that.parent().fadeOut('slow');
            }
          })
          .error((error) => {
            alert(error.responseText);
          });
      }
    });
  };

  CodeSnippetEditor.dispatchCodePreview = function () {
    const that = this;
    this.DOM.preview_pane.on('click', function (e) {
      e.preventDefault();
      that.DOM.output.toggle('slow');
    });
  };

  CodeSnippetEditor.dispatchCopyToClipboard = function () {
    this.DOM.copy_button.on('click', function (e) {
      var sel = ACE_LIB.selection.toJSON(); // save selection
      ACE_LIB.selectAll();
      ACE_LIB.focus();
      document.execCommand('copy');
      ACE_LIB.selection.fromJSON(sel);
      $(this).text('Copied !');
    });
  };

  CodeSnippetEditor.init();
})(jQuery, ace);
