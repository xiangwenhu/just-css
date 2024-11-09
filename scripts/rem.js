;(function () {
    var htmlElement = document.querySelector('html');
    var designWidth = window._FG_CONFIG && window._FG_CONFIG.DS || 1440;

    function getFontSize() {
      var htmlWidth = Math.max(
        htmlElement.offsetWidth || 0,
        htmlElement.clientWidth || 0,
        1440
      )
      return (10 / designWidth) * htmlWidth
    }

    function setFontSize(fontSize) {
      var fontSizeValue = fontSize || getFontSize()
      htmlElement.style.fontSize = fontSizeValue + 'px'
      window.FONT_SIZE = fontSizeValue
    }

    function adjustFontSize() {
      var fontSizeValue = getFontSize()
      // 读取测试元素的宽度
      var testElement = document.getElementById('_test_')
      var testFontSize = testElement.clientWidth

      console.log('pre:realFontSizeValue', fontSizeValue, 'testFontSize:', testFontSize)

      // 误差大于2，重置fontSize
      if (Math.abs(fontSizeValue - testFontSize) > 2) {
        var resetValue = ((fontSizeValue * fontSizeValue) / testFontSize).toFixed(2)
        console.log('pre:resize font-size from ', fontSizeValue, ' to ', resetValue)
        htmlElement.style.fontSize = resetValue + 'px'
      }
      testElement.parentNode.removeChild(testElement)
    }

    // 设置字体
    var fontSizeValue = getFontSize()
    setFontSize(fontSizeValue)
    // window.addEventListener('DOMContentLoaded', adjustFontSize)

    window.addEventListener('resize', function () {
      setFontSize()
      // adjustFontSize();
    })
  })()