/**
  * Change the height of the Twitter feed to match the height of it's sibling columns
  * Search for all Twitter embeds
  * Check that each embed is not in the sidebar
  * Locate the inline style attributes and modify them with the height of sibling content
  **/

  // Show or hide console.log messages
  var debugMode = false

  function changeHeightOfTwitter() {
    'use strict';
    // Get all our Twitter feeds
    var iFrameToEdit = document.getElementsByClassName('twitter-timeline');
      for (var j = 0; j < iFrameToEdit.length; j++)
      {
        // Check we are not in a sidebar
        var sidebar = iFrameToEdit[j].closest('.sidebar');
        if(sidebar == null)
        {
          // Get it's parent container
          var iFrameCol = iFrameToEdit[j].closest('.col');
          var titleHeight = iFrameCol.querySelectorAll('h2, h3, h4, h5, h6')[0].clientHeight;
          var anchorHeight = iFrameCol.getElementsByTagName('a')[0].clientHeight;
          // Get nearest sibling column
          var closestCol = iFrameCol.previousElementSibling;
          // Get its height
          var closestColHeight = closestCol.clientHeight;
          // Subtract height of H3, and padding from height of closest column
          var heightToMatch = closestColHeight - titleHeight - anchorHeight - 29;
          // Get existing attributes so we don't override them
          var existingAttributes = iFrameToEdit[j].getAttribute('style');

          var existingAttributesArray = existingAttributes.split(';');
          if(debugMode)
          {
            console.log('Convert atts to array ' +typeof+existingAttributesArray);
          }
          existingAttributesArray.length = 11;
          var newTwitterAtts = existingAttributesArray.join(';');
          if(debugMode)
          {
            console.log('Rejoined atts ' +newTwitterAtts);
          }
          // Edit height attribute to match height of left column
          iFrameToEdit[j].setAttribute('style', newTwitterAtts + ';min-height:' + heightToMatch + 'px!important;');
        }
      }
  }

  /**
  * Revert the height of the Twitter back to its original height as set by it's
  * inline style attribute
  * This function gets run when the browser is resized back to a single column layout
  **/

  function revertHeightOfTwitter() {
    'use strict';
    var iFrameToEdit = document.getElementsByClassName('twitter-timeline');
      for (var j = 0; j < iFrameToEdit.length; j++)
      {
        var sidebar = iFrameToEdit[j].closest('.sidebar');
        if(debugMode)
        {
          console.log('Is in sidebar  ' +sidebar);
        }
        if(sidebar == null)
        {
          var iFrameCol = iFrameToEdit[j].closest('.col');
          var titleHeight = iFrameCol.querySelectorAll('h2, h3, h4, h5, h6')[0].clientHeight;
          var anchorHeight = iFrameCol.getElementsByTagName('a')[0].clientHeight;
          var closestCol = iFrameCol.previousElementSibling;
          var closestColHeight = closestCol.clientHeight;
          var heightToMatch = closestColHeight - titleHeight - anchorHeight - 29;
          var existingAttributes = iFrameToEdit[j].getAttribute('style');

          var existingAttributesArray = existingAttributes.split(';');
          if(debugMode)
          {
            console.log('Convert atts to array ' +typeof+existingAttributesArray);
          }
          existingAttributesArray.length = 11;
          var newTwitterAtts = existingAttributesArray.join(';');
          if(debugMode)
          {
            console.log('Rejoined atts ' +newTwitterAtts);
          }
          // Edit height attribute to match height of left column
          iFrameToEdit[j].setAttribute('style', newTwitterAtts);

        }
      }
  }
  // Run the function on page load, but only if we're not on mobile
  window.addEventListener("load", function() {
    if (window.matchMedia("(min-width: 481px)").matches) {
      // Give the rest of the JS a chance to load first...
      setTimeout(function() {
        changeHeightOfTwitter();
      }, 200);
    }
  });

  // Listen for changes in page layout, and re-run or revert the function as required
  Harvey.attach('screen and (min-width:481px) and (max-width: 1024px)', {
    setup:  function() {
      changeHeightOfTwitter();
    },
    on:   function() {
      changeHeightOfTwitter();
    },
    off:  function() {
      revertHeightOfTwitter();
    }
  });