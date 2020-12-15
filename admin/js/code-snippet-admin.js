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
  const ACE_LIB = ace.edit('editor');

  CodeSnippetEditor.init = function () {
    this.setAceDefaultConfig();
    this.dispatchTheme();
    this.dispatchFont();
    this.dispatchCodeSnippetList();
    this.dispatchSnippetLabel();
    this.dispatchCodeExecution();
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

  CodeSnippetEditor.DOM = {
    output: $('#instant-snippet-output'),
    font: $('#instant-snippet-font-size'),
    theme: $('#instant-snippet-change-theme'),
    current_tab: $('#code-snippet-current-tab'),
    language: $('#instant-snippet-change-lang'),
    snippet_toolbar: $('.code-snippet-quick-code'),
    execution_button: $('#instant-snippet-execute'),
    recent_filename: $('#code-snippet-recent-filename'),
    recent_files: $('#code-snippet-recently-veiwed-file'),
    snippet_toolbar_button: $('.code-snippet-quick-code label'),
  };

  CodeSnippetEditor.ACTIONS = {
    code_execution: 'code_snippet_execution',
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
      console.log('Hello world');
      let lang = $(this).val() === undefined ? 'php' : $(this).val();

      switch (lang) {
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
    command += '<html>\n\t<head>\n\t<title>Untitled</title>\n';
    command += '\n\t\t<script>\n';
    command += "\t\t\tconsole.log('Silence is golden');";
    command += '\n\t\t</script>\n';
    command += '\t</head>\n<body>\n\t<h2>Hello world</h2>\n';
    command += '</body>\n</html>';
    editor.session.setValue(command);
    ACE_LIB.session.setMode('ace/mode/html5');
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
    const file_name = filename + '.php';
    const getElementAttr = this.getFileAttribute();
    if (getElementAttr.indexOf(file_name) === -1) {
      let el = `<li data-file="${filename}"><a href="#" id="code-snippet-delete-file" data-file="${filename}"><span>&times;</span></a>
				<a href="#" style="text-decoration: none;" class="open-recent-file" data-id="${filename}" data-file="${filename}">
				<h3 style="padding-top: 0px;margin: 0px;">${filename}</h3>
				<p>
					<small>Modified: -- </small>
				</p>
			</a></li>`;
      $('.code-snippet-history ul').prepend(el);
    }
  };

  CodeSnippetEditor.getFileAttribute = function () {
    const history = $('.code-snippet-history ul');
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
      const formatElement = `<i>Untitled${filename.tabIndex}</i>`;
      that.DOM.recent_files.html(formatElement);
      that.DOM.recent_filename.val(filename.tabIndex);
      that.createFile(filename.title);
      ajax(payload)
        .success(function (resp) {
          $('#instant-snippet-output').slideDown().html(resp);
        })
        .error(function (err) {
          $('#instant-snippet-output')
            .slideDown()
            .html('')
            .html(err.responseText);
        });

      // ajax({
      //   action: 'code_snippet_run_time',
      //   filename: filename.title,
      // })
      //   .success(function (resp) {
      //     const elem = resp.split('code_snippet_time:');
      //     const runTime = elem[1] === undefined ? 0 : elem[1];
      //     $('#code-snippet-run-time').html(
      //       `${parseFloat(runTime).toFixed(3)}s`,
      //     );
      //   })
      //   .error(function (err) {
      //     $('#instant-snippet-output')
      //       .slideDown()
      //       .html('')
      //       .html(err.responseText);
      //   });
    });
  };

  CodeSnippetEditor.getNewFileName = function () {
    ACE_LIB.getSession().getValue();
    let lastFile = $('#code-snippet-recent-filename').val();
    let tabChanger = $('#code-snippet-current-tab').val();
    let fileIndexNumber =
      tabChanger === '0' ? parseInt(lastFile) + 1 : tabChanger;
    return { title: 'Untitled' + fileIndexNumber, tabIndex: fileIndexNumber };
  };

  // $('#instant-snippet-execute').on('click', function () {
  //   // const editor = ace.edit('editor');
  //   // const code = editor.getSession().getValue();
  //   // let lastFile = $('#code-snippet-recent-filename').val();
  //   // let tabChanger = $('#code-snippet-current-tab').val();
  //   // let postFix = tabChanger === '0' ? parseInt(lastFile) + 1 : tabChanger;
  //   // const filename = 'Untitled' + postFix;

  //   const payload = {
  //     code: code,
  //     tab: postFix,
  //     action: 'code_snippet_execution',
  //     filename: filename,
  //   };

  //   $('#code-snippet-recently-veiwed-file').html(`<i>Untitled${postFix}</i>`);
  //   $('#code-snippet-recent-filename').val(postFix);
  //   this.createFile(filename);
  // });

  $(document).on('click', '#code-snippet-new-tab', function (e) {
    e.preventDefault();
    let lastFile = $('#code-snippet-recent-filename').val();

    let newTab = isNaN(lastFile) || lastFile === 0 ? 1 : parseInt(lastFile) + 1;
    let newTabTitle = 'Untitled' + newTab;
    $('#code-snippet-recent-filename').val(newTab);

    //clear screen
    const editor = ace.edit('editor');
    const code = editor.getSession().setValue('');

    $('#code-snippet-recently-veiwed-file').html(`<i>${newTabTitle}</i>`);

    // generate filename
    let ajaxData = {
      code: code,
      tab: newTab,
      action: 'code_snippet_execution',
      filename: newTabTitle,
    };

    ajax(ajaxData)
      .success(function (resp) {
        $('#instant-snippet-output').slideDown().html('');
      })
      .error(function (err) {
        console.log(err.responseText);
      });
  });

  function ajax(payload) {
    return $.ajax({
      url: ajaxurl,
      data: payload,
      method: 'POST',
    });
  }

  $(document).on('click', '.open-recent-file', function (e) {
    e.preventDefault();
    const filename = $(this).data('file');
    const data = {
      filename: filename,
      action: 'code_open_existing_file',
    };

    ajax(data)
      .success((res) => {
        const editor = ace.edit('editor');
        editor.getSession().setValue(res);
        let tabNumber = filename.match(/\d/g);
        const index = tabNumber.join('');
        $('#code-snippet-current-tab').val(index);
        $('#code-snippet-recently-veiwed-file').html(`<i>${filename}</i>`);
      })
      .error((err) => {
        console.log(err);
      });
  });

  $(document).on('click', '#code-snippet-delete-file', function (e) {
    e.preventDefault();
    const filename = $(this).data('file');
    let that = $(this);
    if (window.confirm(`Are you sure you want to delete ${filename}?`)) {
      const data = {
        filename: filename,
        action: 'code_snippet_delete_file',
      };

      ajax(data)
        .success((res) => {
          if (res === 'deleted') {
            alert(filename + ' is Deleted !');
            that.parent().fadeOut('slow');
          }
        })
        .error((err) => {
          console.log(err);
        });
    }
  });

  $(document).on('click', '#code-snippet-preview-pane', function (e) {
    e.preventDefault();
    $('#instant-snippet-output').toggle('slow');
  });

  CodeSnippetEditor.init();
})(jQuery, ace);
