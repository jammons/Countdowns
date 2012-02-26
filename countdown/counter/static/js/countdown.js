// for my countdown js
(function() {
    Counter = Backbone.Model.extend({
        // model for each counter
        initialize: function(){
            console.log('new model');
        },
        defaults: {
            days: null,
            hours: null,
            minutes: null,
            seconds: null
        }
    });

    CounterView = Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'syncWithDOM', 'tick', 'updateValues')
            this.syncWithDOM();

            if (this.hasTimeLeft()) {
                this.tick();
            }

            this.model.bind('change', this.updateValues);
        },
        syncWithDOM: function(){
            var view = this;
            view.model.set({
                days: view.$el.find('.days .value').text(),
                hours: view.$el.find('.hours .value').text(),
                minutes: view.$el.find('.minutes .value').text(),
                seconds: view.$el.find('.seconds .value').text()
            });
        },

        tick: function(){
            // Handles counting down
            var counter = this.model;
            var days = counter.get('days');
            var hours = counter.get('hours');
            var minutes = counter.get('minutes');
            var seconds = counter.get('seconds');

            if (seconds != 0) {
                counter.set({'seconds': (seconds - 1)});
            } else {
                // seconds are 0
                seconds = 59;
                if (minutes != 0) {
                    counter.set({
                        'seconds': seconds,
                        'minutes': ( minutes - 1 )
                    });
                } else {
                    // minutes and seconds are 0
                    seconds = 59;
                    minutes = 59;
                    if (hours != 0) {
                        counter.set({
                            'seconds': seconds,
                            'minutes': minutes,
                            'hours': (hours - 1)
                        });
                    } else {
                        // minutes, seconds, and hours are 0
                        seconds = 59;
                        minutes = 59;
                        hours = 23;
                        if (days != 0) {
                            counter.set({
                                'seconds': seconds,
                                'minutes': minutes,
                                'hours': hours,
                                'days': (days - 1)
                            });
                        } // no else needed here because everything is 0
                    }
                }
            }

            // Set to tick again in 1 second
            var that = this;
            setTimeout(function(){ that.tick() }, 1000);
        },

        updateValues: function(){
            var counter = this.model;
            var $el = this.$el;
            var days = counter.get('days');
            var hours = counter.get('hours');
            var minutes = counter.get('minutes');
            var seconds = counter.get('seconds');

            days = this.addLeadingZero(days);
            hours = this.addLeadingZero(hours);
            minutes = this.addLeadingZero(minutes);
            seconds = this.addLeadingZero(seconds);

            $el.find('.days .value').text(days);
            $el.find('.hours .value').text(hours);
            $el.find('.minutes .value').text(minutes);
            $el.find('.seconds .value').text(seconds);
        },

        addLeadingZero: function(num){
            // change digits like 3 or 2 to "03" and "02" for display
            if(num.toString().length < 2) {
                return '0' + num;
            } else {
                return num;
            }
        },

        hasTimeLeft: function(){
            var hasTimeLeft = true;
            if (this.model.days == 0 && this.model.hours == 0 && this.model.minutes == 0 && this.model.seconds == 0) {
                hasTimeLeft = false;
            }
            return hasTimeLeft;
        }
    });

    // loop through all .counter objects and create views for them
    $('.counter').each(function(){
        var counter = new Counter;
        new CounterView({ model: counter, el: this });
    });

})();
