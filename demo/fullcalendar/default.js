/* eslint no-console: 0, complexity: 0 */
'use strict';
(function(window, calendar) {
    var cal, resizeThrottled, idx = 20;
    var baseDate = new Date(), formattedDate = tui.util.formatDate('YYYY-MM-DD', baseDate);

    calendar.setTimezoneOffset(0);

    cal = calendar.FullCalendar({
        defaultView: 'month',
        template: {
            milestone: function(model) {
                return '<span style="color:red;"><i class="fa fa-flag"></i> ' + model.title + '</span>';
            },
            milestoneTitle: function() {
                return '마일스톤-a';
            },
            task: function(model) {
                return '&nbsp;&nbsp;#' + model.title;
            },
            taskTitle: function() {
                return '<label><input type="checkbox" /> 업무</label>';
            },
            allday: function(model) {
                return model.title + ' <i class="fa fa-refresh"></i>';
            },
            time: function(model) {
                return model.title + ' <i class="fa fa-refresh"></i>' + model.starts;
            }
        },
        week: {
            panelHeights: [80, 80, 120]
        }
    }, document.getElementById('calendar'));

    cal.setCalendarColor('1', {
        color: '#e8e8e8',
        bgColor: '#585858',
        render: false
    });
    cal.setCalendarColor('2', {
        color: '#282828',
        bgColor: '#dc9656',
        render: false
    });
    cal.setCalendarColor('3', {
        color: '#a16946',
        bgColor: '#ab4642',
        render: false
    });

    cal.createEvents([
        {
            id: '1',
            calendarID: '1',
            title: '스크럼',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T09:30:00+09:00',
            ends: formattedDate + 'T10:30:00+09:00'
        },
        {
            id: '2',
            calendarID: '2',
            title: '[추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T17:30:00+09:00',
            ends: formattedDate + 'T17:45:00+09:00'
        },
        {
            id: '3',
            calendarID: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '4',
            calendarID: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '5',
            calendarID: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '6',
            calendarID: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '7',
            calendarID: '2',
            title: '[추가 추가 일정]',
            category: 'time',
            dueDateClass: '',
            starts: formattedDate + 'T18:00:00+09:00',
            ends: formattedDate + 'T18:59:59+09:00'
        },
        {
            id: '8',
            calendarID: '2',
            title: '[종일일정입니다!]',
            category: 'allday',
            dueDateClass: '',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '9',
            calendarID: '2',
            title: '[추가 추가 일정]',
            category: 'milestone',
            dueDateClass: '',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '10',
            calendarID: '2',
            title: '[추가 추가 일정2]',
            category: 'milestone',
            dueDateClass: '',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '11',
            calendarID: '2',
            title: '[종일일정입니다2!]',
            category: 'allday',
            dueDateClass: '',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        },
        {
            id: '12',
            calendarID: '2',
            title: '[종일일정입니다3!]',
            category: 'allday',
            dueDateClass: '',
            starts: formattedDate + 'T00:00:00+09:00',
            ends: formattedDate + 'T00:00:00+09:00'
        },
    ]);

    cal.render();

    // 일정 클릭 이벤트 핸들러
    cal.on({
        'clickEvent': function(e) {
            console.log('click', e);
        },
        'beforeCreateEvent': function(e) {
            var title = prompt('Name of event to create:');

            if (!title) {
                return;
            }

            cal.createEvents([{
                id: String(idx),
                calendarID: '',
                title: title,
                isAllDay: e.isAllDay,
                starts: e.starts,
                ends: e.ends,
                category: e.isAllDay ? 'allday' : 'time',
                dueDateClass: '',
                raw: {
                    projectCode: '123'
                }
            }]);

            idx += 1;

            console.log('select', e);
        },
        'beforeUpdateEvent': function(e) {
            cal.updateEvent(e.model.id, {
                starts: e.starts,
                ends: e.ends
            });

            console.log('update', e);
        },
        'beforeDeleteEvent': function(e) {
            console.log('delete', e);
        },
        'resizePanel': function(e) {
            console.log('resizePanel', e);
        }
    });

    resizeThrottled = tui.util.throttle(function() {
        cal.refresh();
    }, 50);

    window.addEventListener('resize', resizeThrottled);

    /**********
     * Control
     **********/
    function onClick(e) {
        var action = e.target.dataset.action;

        switch (action) {
            case 'move-prev':
                cal.prev();
                break;
            case 'move-next':
                cal.next();
                break;
            case 'move-today':
                cal.today();
                break;
            case 'toggle-day':
                cal.toggleView('day');
                break;
            case 'toggle-week':
                cal.toggleView('week');
                break;
            case 'toggle-month':
                cal.toggleView('month');
                break;
            default:
                return;
        }
    }


    // 일정 클릭 이벤트 핸들러
    cal.on('clickEvent', function() {
        console.log('click');
    });

    cal.on('beforeCreateEvent', function(e) {
        console.log('beforeCreateEvent', e);
    });

    cal.on('beforeUpdateEvent', function(e) {
        console.log('beforeUpdateEvent', e);
    });

    cal.on('beforeDeleteEvent', function(e) {
        console.log('beforeDeleteEvent', e);
    });

    document.querySelector('.control').addEventListener('click', onClick);

    window.cal = cal;
})(window, ne.dooray.calendar);
