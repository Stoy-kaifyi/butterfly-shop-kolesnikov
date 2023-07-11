$(document).ready(function() {

  // меню бургер

  $('.js-burger').on('click', function () {
    $('.js-menu').slideToggle();
  });

  // ajax каталог

  $('.js-catalog-btn').on('click', function () {
    $.ajax({
      type: 'GET',
      url: '../jsons/catalog.json',
      data: {
        quantity: 4
      },
      success: function(res) {
        let catalogHtml = createcatalogHtml(res.catalog);

        $('.js-catalog-wrap').append(catalogHtml);
      },
      error: function () {
        console.log('похоже что-то не то(');
      }
    });
  });

  function createcatalogHtml(dataArray) {
    let htmlString = '';

    dataArray.forEach(function (item) {
      htmlString = htmlString +
      `<div class="catalog-wrap"><img src="${item.imgUrl}" alt="${item.imgAlt}" class="catalog-img"></img><figcaption class="catalog-caption">${item.text}</figcaption></div >`;
    });


    return htmlString;
  }

  //  табы фильтрации каталог

  $('.js-filter-link').on('click', function(event) {
    event.preventDefault();

    $('.js-filter-link').removeClass('active');
    $(this).addClass('active');

    let filterType = $(this).data('filter');

    if (filterType === 'all') {
      $('.js-catalog-item').show();
      return;
    }

    $('.js-catalog-item').each(function () {
      let dataType = $(this).data('type');

      if (filterType === dataType) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // табы на странице контакты

  $('.js-tab-link').on('click', function(event) {
    event.preventDefault();
    $('.js-tab-link').removeClass('active');
    $(this).addClass('active');

    let index = $(this).index('.js-tab-link');

    $('.js-contacts-item').removeClass('active');
    $('.js-contacts-item').eq(index).addClass('active');
  });

  // аккордион faq

  let prevBtn;
  $('.js-accordion-btn').on('click',function(){
if (prevBtn === this) {
  $(this).toggleClass('open');
  $(this).next().slideToggle();
} else {
  $(prevBtn).next().slideUp();
  $(prevBtn).removeClass('open');
  $(this).next().slideDown();
  $(this).addClass('open');
  prevBtn = this;
}
  });

})

