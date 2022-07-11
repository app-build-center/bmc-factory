/**
 * Usado para alterar a cor de um postit
 */
function PostitColorPicker() {

  /**
   * O postit que está sendo editado agora
   */
  this._postitNow = null;

  /**
   * As cores disponíveis, para fácil manutenção
   **/
  this._colorsArray = [
    'bg_color_0_0_0',
    'bg_color_153_51_0',
    'bg_color_51_51_0',
    'bg_color_0_0_128',
    'bg_color_51_51_153',
    'bg_color_51_51_51',
    'bg_color_128_0_0',
    'bg_color_255_102_0',
    'bg_color_128_128_0',
    'bg_color_0_128_0',
    'bg_color_0_128_128',
    'bg_color_255_255_136',
    'bg_color_102_102_153',
    'bg_color_128_128_128',
    'bg_color_204_0_0',
    'bg_color_255_153_0',
    'bg_color_153_204_0',
    'bg_color_51_153_102',
    'bg_color_51_204_204',
    'bg_color_51_102_255',
    'bg_color_128_0_128',
    'bg_color_153_153_153',
    'bg_color_204_0_255',
    'bg_color_255_204_0',
    'bg_color_255_255_0',
    'bg_color_0_255_0',
    'bg_color_0_255_255',
    'bg_color_0_204_255',
    'bg_color_153_51_102',
    'bg_color_192_192_192',
    'bg_color_255_153_204',
    'bg_color_255_204_153',
    'bg_color_255_255_153',
    'bg_color_204_255_255',
    'bg_color_153_204_255',
    'bg_color_255_255_255'];

  /**
   * As cores disponíveis usado pela funcionalidade
   */
  this._colors = this._colorsArray.join(' ');
}

/**
 * Exibe o picker
 */
PostitColorPicker.prototype.show = function (buttonColor, onChange) {
  const offset = $(buttonColor).offset();
  this._onChange = onChange;
  this._postitNow = $(buttonColor).parent().parent();
  let left = offset.left;
  let top = offset.top;
  const $palette = $('#color-palette');
  $palette.show();

  const width = $('#color-palette').width();
  const height = $('#color-palette').height();

  if (left + width > window.innerWidth) {
    left = window.innerWidth - width - 10;
  }

  if (top + height > window.innerHeight) {
    top = window.innerHeight - height - 20;
  }

  $palette.offset({
    "top": top,
    "left": left
  });
};

/**
 * Seta cor de um postit
 */
PostitColorPicker.prototype.setPostitColor = function (postit, color) {
  const $el = $(postit);
  $('.color', $el).removeClass(this._colors).addClass(color);
  $el.removeClass(this._colors).addClass(color);

  const rgb = color.replace('bg_color_', '').split('_');
  $el[0].style.color = getCorrectTextColor(rgb[0], rgb[1], rgb[2]);
};

/**
 * Exibe o picker
 */
PostitColorPicker.prototype.set = function (selected) {
  if (this._postitNow) {
    const color = $(selected).attr('class').replace('swatch ', '');
    postitColorPicker.setPostitColor($(this._postitNow), color);
    $('#color-palette').hide();
    if (this._onChange) {
      this._onChange();
    }
  }
};

function getCorrectTextColor(r, g, b) {

  /*
    From this W3C document: http://www.webmasterworld.com/r.cgi?f=88&d=9769&url=http://www.w3.org/TR/AERT#color-contrast

    Color brightness is determined by the following formula:
    ((Red value X 299) + (Green value X 587) + (Blue value X 114)) / 1000

    I know this could be more compact, but I think this is easier to read/explain.
  */

  const threshold = 130; /* about half of 256. Lower threshold equals more dark text on dark background  */
  const cBrightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  if (cBrightness > threshold) {
    return "#000000";
  } else {
    return "#ffffff";
  }
}

window.postitColorPicker = new PostitColorPicker();
