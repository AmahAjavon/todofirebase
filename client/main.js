'use strict';

$(function() {

  var myDataRef = new Firebase('https://aj-todo.firebaseio.com/');

  var rowCount = 0;
  var fbIdArr = [];

  $('#add').click(function() {
    var title = $('#title').val();
    var date = $('#date').val();
    var priority = $('#priority').val();
    myDataRef.push({title: title, date: date, priority: priority, isComplete: 'No'});

  })

  myDataRef.on('child_added', function(data) {
    var task = data.val();
    displayTask(task.title, task.date, task.priority, task.isComplete);

    console.log(data.name());
    fbIdArr.push(data.name());
  })

  function displayTask(title, date, priority, isComplete) {

    $('#tbody').append('<tr id="row'+ rowCount +'">' + '<td class="title">' + title + '</td>' + '<td class="date">' +
    date + '</td>' + '<td class="priority">' + priority + '</td>'
    + '<td class="change">' + isComplete + '</td>' + '<td><button id="button'+ rowCount++ +'"  class="line">Complete</button></td>'
    + '</tr>');

    if (isComplete === 'Yes') {
      $('#row'+ (rowCount -1) + ' .title' ).css({'text-decoration': 'line-through'});
      $('#row'+ (rowCount -1) + ' .date' ).css({'text-decoration': 'line-through'});
      $('#row'+ (rowCount -1) + ' .priority' ).css({'text-decoration': 'line-through'});
    };

    $('.line').off().click(function() {
      console.log($(this).attr('id'));
      var buttonID = $(this).attr('id').slice(-1);
      $('#row'+buttonID + ' .title' ).css({'text-decoration': 'line-through'});
      $('#row'+buttonID + ' .date' ).css({'text-decoration': 'line-through'});
      $('#row'+buttonID + ' .priority' ).css({'text-decoration': 'line-through'});
      $('#row'+buttonID + ' .change' ).text('Yes');

      var idRef = myDataRef.child(fbIdArr[buttonID]);
      idRef.update({
        isComplete: 'Yes'
      })

    })
  }

});
