// add R.A.F. shim, to be used for the jump-to-section buttons
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();



// scroll it!
// scrollButton = document.getElementById("ctaButton");
// scrollButton.addEventListener("click", function(){scrollToY(0, 1500, 'easeInOutQuint')}, false);

new Vue({
    el: "#app",
    data: {
        classCountGoal: 100,
        classes: [
            {
                day: 6,
                month: 1,
                year: 2020,
                type: "gi"
            },
            {
                day: 6,
                month: 1,
                year: 2020,
                type: "gi"
            },
            {
                day: 9,
                month: 1,
                year: 2020,
                type: "gi"
            },
            {
                day: 13,
                month: 1,
                year: 2020,
                type: "gi"
            },
            {
                day: 15,
                month: 1,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 29,
                month: 1,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 29,
                month: 1,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 2,
                month: 2,
                year: 2020,
                type: "open-mat"
            },
            {
                day: 5,
                month: 2,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 5,
                month: 2,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 8,
                month: 2,
                year: 2020,
                type: "gi"
            },
            {
                day: 12,
                month: 2,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 12,
                month: 2,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 19,
                month: 2,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 19,
                month: 2,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 24,
                month: 2,
                year: 2020,
                type: "gi"
            },
            {
                day: 2,
                month: 3,
                year: 2020,
                type: "gi"
            },
            {
                day: 2,
                month: 3,
                year: 2020,
                type: "gi"
            },
            {
                day: 4,
                month: 3,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 4,
                month: 3,
                year: 2020,
                type: "no-gi"
            },
            {
                day: 7,
                month: 3,
                year: 2020,
                type: "gi"
            },
            {
                day: 9,
                month: 3,
                year: 2020,
                type: "gi"
            },
            {
                day: 9,
                month: 3,
                year: 2020,
                type: "gi"
            }
        ],
        classTypes: [
            "gi",
            "no-gi",
            "open-mat"
        ],
        monthData: [
            { id: 1, days: 31 }, // January
            { id: 2, days: 28 }, // February
            { id: 3, days: 31 }, // March
            { id: 4, days: 30 }, // April
            { id: 5, days: 31 }, // May
            { id: 6, days: 30 }, // June
            { id: 7, days: 31 }, // July
            { id: 8, days: 31 }, // August
            { id: 9, days: 30 }, // September
            { id: 10, days: 31 }, // October
            { id: 11, days: 30 }, // November
            { id: 12, days: 31 }, // December
        ],
        currentDate: new Date(),
        addClassDay: new Date().getDate(),
        addClassMonth: new Date().getMonth() + 1,
        addClassYear: new Date().getFullYear(),
        addClassType: "gi",
        donutWidth: 100,
        donutCx: 50,
        donutCy: 50,
        donutStrokeWidth: 18,
        modalShownAddClass: false,
        modalShownSettings: false,
        modalShownRemoveClass: false,
        removeClassIndex: 0,
        confirmationMessage: "Class added!",
        confirmationShown: false,
        inputHasError: false,
        inputErrorMessage: "Not a valid date, m8."
    },
    computed: {
        currentDay() {
            return this.currentDate.getDate();
        },
        currentMonth() {
            return this.currentDate.getMonth() + 1;
        },
        currentYear() {
            return this.currentDate.getFullYear();
        },
        totalDays() {
            // Add an extra day in February if it's currently a leap year
            if ((this.currentYear % 4) == 0) {
                console.log("It's a leap year!");
                this.monthData[1].days = 29;
                return 366;
            } else {
                this.monthData[1].days = 28;
                return 365;
            }
        },
        daysPassed() {
            let count = 0;
            for (let i = 0; i < this.monthData.length; i++) {
                if (this.currentMonth == this.monthData[i].id) {
                    count += this.currentDay;
                    break;
                } else {
                    count += this.monthData[i].days;
                }
            }
            return count;
        },
        months() {
            let currentDayOfWeek = this.currentDate.getDay(),
                a = this.daysPassed % 7,
                initialOffset = (currentDayOfWeek - a + 1) % 7;

            if (initialOffset < 0) {
            	initialOffset += 7;
            };

            let monthsArray = [
                {
                    id: 1,
                    month: "January",
                    days: this.monthData[0].days,
                    offset: initialOffset,
                    classesTaken: [
                        // {
                        //     day: 3,
                        //     type: "no-gi"
                        // },
                        // {
                        //     day: 7,
                        //     type: "gi"
                        // }
                    ],
                    classDays: [
                        // 3,
                        // 7
                    ]
                },
                {
                    id: 2,
                    month: "February",
                    days: this.monthData[1].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 3,
                    month: "March",
                    days: this.monthData[2].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 4,
                    month: "April",
                    days: this.monthData[3].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 5,
                    month: "May",
                    days: this.monthData[4].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 6,
                    month: "June",
                    days: this.monthData[5].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 7,
                    month: "July",
                    days: this.monthData[6].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 8,
                    month: "August",
                    days: this.monthData[7].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 9,
                    month: "September",
                    days: this.monthData[8].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 10,
                    month: "October",
                    days: this.monthData[9].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 11,
                    month: "November",
                    days: this.monthData[10].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                },
                {
                    id: 12,
                    month: "December",
                    days: this.monthData[11].days,
                    offset: 0,
                    classesTaken: [],
                    classDays: []
                }
            ];

            // Populate the classesTaken with info from the classes data
            for (var i = 0; i < this.classes.length; i++) {
                let classDay = this.classes[i].day,
                    classMonth = this.classes[i].month,
                    classType = this.classes[i].type;

                monthsArray[classMonth - 1].classesTaken.push({
                    day: classDay,
                    type: classType
                });
            }

            // Add the calendar offsets to the monthsArray above
            for (var i = 0; i < monthsArray.length; i++) {

                // Calculate the day of the week that the month starts on, for the calendar
                if (i > 0) {
                    monthsArray[i].offset = (monthsArray[i - 1].offset + monthsArray[i - 1].days) % 7;
                }

                // loop through classesTaken, add each class day to classDays
                for (var j = 0; j < monthsArray[i].classesTaken.length; j++) {
                    monthsArray[i].classDays.push(monthsArray[i].classesTaken[j].day)
                }
            }

            return monthsArray;
        },
        classCountGi() {
            let count = 0;
            for (let i = 0; i < this.classes.length; i++) {
                if (this.classes[i].type == "gi") {
                    count++;
                }
            }
            return count;
        },
        classCountNoGi() {
            let count = 0;
            for (let i = 0; i < this.classes.length; i++) {
                if (this.classes[i].type == "no-gi") {
                    count++;
                }
            }
            return count;
        },
        classCountOpenMat() {
            let count = 0;
            for (let i = 0; i < this.classes.length; i++) {
                if (this.classes[i].type == "open-mat") {
                    count++;
                }
            }
            return count;
        },
        classCountTotal() {
            return this.classCountGi + this.classCountNoGi + this.classCountOpenMat;
        },
        classCountPercentGi() {
            return Math.round(this.classCountGi / this.classCountTotal * 10000) / 100;
        },
        classCountPercentNoGi() {
            return Math.round(this.classCountNoGi / this.classCountTotal * 10000) / 100;
        },
        classCountPercentOpenMat() {
            return Math.round(this.classCountOpenMat / this.classCountTotal * 10000) / 100;
        },
        progressPercentGi() {
            return this.classCountGi / this.classCountGoal * 100;
        },
        progressPercentNoGi() {
            return this.classCountNoGi / this.classCountGoal * 100;
        },
        progressPercentOpenMat() {
            return this.classCountOpenMat / this.classCountGoal * 100;
        },
        progressPercentGoal() {
            return Math.round(this.classCountTotal / this.classCountGoal * 10000) / 100;
        },
        progressPercentYear() {
            return Math.round(this.daysPassed / this.totalDays * 10000) / 100;
        },
        averageDaysPerClass() {
            return Math.round(this.daysPassed / this.classes.length * 100) / 100;
        },
        averageClassesPerWeek() {
            return Math.round(this.classes.length / (this.daysPassed / 7) * 100) / 100;
        },
        paceClassesForTheYear() {
            return Math.floor(this.classes.length / this.daysPassed * this.totalDays);
        },
        paceToReachGoal() {
            let weeksLeft = (this.totalDays - this.daysPassed) / 7,
                classesLeft = this.classCountGoal - this.classes.length;

            return Math.round(classesLeft / weeksLeft * 100) / 100;
        },
        donutValues() {
            return [
                {
                    value: this.classCountGi,
                    color: "#F84E5A"
                },
                {
                    value: this.classCountNoGi,
                    color: "#19AFEE"
                },
                {
                    value: this.classCountOpenMat,
                    color: "#35E352"
                }
            ]
        },
        donutRadius() {
            return (this.donutWidth - this.donutStrokeWidth) / 2;
        },
        donutCircumference() {
            return 2 * Math.PI * this.donutRadius;
        }
    },
    methods: {
        addClass(message) {

            let newClassData = {
                day: this.addClassDay,
                month: this.addClassMonth,
                year: this.addClassYear,
                type: this.addClassType
            };

            // check if the date of the class they're trying to add is invalid first
            if (newClassData.day > this.monthData[this.addClassMonth - 1].days) {

                this.inputHasError = true;
                return;
            }

            // if it's a valid date, then add the new class
            else {

                this.inputHasError = false;

                // if no classes exist yet...
                if (this.classes.length == 0) {

                    // ...then just push the new class to the classes array
                    this.classes.push(newClassData);

                // otherwise, if classes do exist already...
                } else {

                    // ...then start looping through them to check where to insert the new class
                    for(var i = 0; i < this.classes.length; i++) {


                        /* if at the end and addMonth > currentMonth,
                        or at the end and addMonth == currentMonth and addDay >= currentDay */
                        if (((i == this.classes.length - 1) && (this.addClassMonth > this.classes[i].month)) ||((i == this.classes.length - 1) && (this.addClassMonth == this.classes[i].month) && (this.addClassDay >= this.classes[i].day))) {

                            // push the new class to the classes array
                            this.classes.push(newClassData);
                            break;

                        } else if (this.addClassMonth < this.classes[i].month) {
                            this.classes.splice(i, 0, newClassData);
                            break;
                        } else if (this.addClassMonth == this.classes[i].month) {
                            if (this.addClassDay < this.classes[i].day) {
                                this.classes.splice(i, 0, newClassData);
                                break;
                            }
                        }
                    }
                }


                // create new XHR object
                // var xhr = new XMLHttpRequest();

                // xhr.open('POST', 'do-thing.php');

                // send the proper header information along with the request
                // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

                // send request, https://www.youtube.com/watch?v=82hnvUYY6QA @ 59:00 he goes into sending parameters in the POST request
                // xhr.send(JSON.stringify(newClassData));

                this.displayConfirmation(message);

            }
        },
        removeClass(index, message) {
            this.classes.splice(index, 1);
            this.modalShownRemoveClass = false;
            this.displayConfirmation(message);
        },
        displayConfirmation(message) {
            this.confirmationMessage = message;
            this.confirmationShown = true;
            setTimeout(this.hideConfirmation, 2000);
        },
        hideConfirmation() {
            this.confirmationShown = false;
        },
        modalToggleAddClass() {
            this.modalShownAddClass = !this.modalShownAddClass;
        },
        modalToggleSettings() {
            this.modalShownSettings = !this.modalShownSettings;
        },
        modalToggleRemoveClass(index) {
            this.removeClassIndex = index;
            this.modalShownRemoveClass = !this.modalShownRemoveClass;
        },
        inputSelectCheckCurrentMonth(input) {
            if (this.months[this.currentMonth - 1].month == input) {
                return true;
            } else {
                return false;
            }
        },
        calcStrokeDashOffset(input) {
            return strokeOffset = this.donutCircumference - (input / this.classCountTotal * this.donutCircumference);
        },
        calcDonutSegmentRotation(index) {
            let initialRotation = 90,
                result = 0;

            for (let i = 1; i <= index; i++) {
                result += this.donutValues[i - 1].value / this.classCountTotal * 360;
            }

            return "rotate(" + (result - initialRotation) + "deg)";
        },
        calcDonutSegmentOrientation() {
            return "50% 50%";
        },
        classTypeTag(input) {
            switch (input) {
                case "gi":
                    return "class-type-tag-gi";
                case "no-gi":
                    return "class-type-tag-nogi";
                case "open-mat":
                    return "class-type-tag-openmat";
                default:
                    return "wtf-did-you-do";
            };
        },
        calendarDayHasClass(day, month) {

            // first, see if there are any classes taken this month
            if (this.months[month - 1].classesTaken.length > 0) {

                let dayIndex = this.months[month - 1].classDays.indexOf(day);

                if (dayIndex >= 0) {
                    // console.log(this.months[month - 1].classesTaken[dayIndex].type);
                    return true;
                }
            }
        },
        calcCalendarDayType(day, month) {
            let dayIndex = this.months[month - 1].classDays.indexOf(day),
                input = this.months[month - 1].classesTaken[dayIndex].type;


            switch (input) {
                case "gi":
                    return "calendar-class-gi";
                case "no-gi":
                    return "calendar-class-nogi";
                case "open-mat":
                    return "calendar-class-openmat";
                default:
                    return "wtf-did-you-do";
            };
        },
        calendarCurrentDay(day, month) {
            if (this.currentMonth == (month)) {
                if (this.currentDay == day) {
                    return true;
                }
            }
        },
        scrollToSection(sectionId) {

            let section = document.getElementById(sectionId),
                bodyRect = document.body.getBoundingClientRect(),
                sectionRect = section.getBoundingClientRect(),
                sectionOffset = sectionRect.top - bodyRect.top - 8; // 8px is 0.5rem, which is the padding around each card

            var scrollY = window.scrollY || document.documentElement.scrollTop,
                scrollTargetY = sectionOffset,
                speed = 1200,
                easing = 'easeInOutQuint',
                currentTime = 0;

            // min time 0.3, max time 1 seconds
            var time = Math.max(0.3, Math.min(Math.abs(scrollY - scrollTargetY) / speed, 1));

            // easing equations from https://github.com/danro/easing-js/blob/master/easing.js
            var easingEquations = {
                    easeInOutQuint: function (pos) {
                        if ((pos /= 0.5) < 1) {
                            return 0.5 * Math.pow(pos, 5);
                        }
                        return 0.5 * (Math.pow((pos - 2), 5) + 2);
                    }
                };

            // add animation loop
            function tick() {
                currentTime += 1 / 60;

                var p = currentTime / time;
                var t = easingEquations[easing](p);

                if (p < 1) {
                    requestAnimFrame(tick);

                    window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
                } else {
                    window.scrollTo(0, scrollTargetY);
                }
            }

            // call it once to get started
            tick();
        }
    },
})
