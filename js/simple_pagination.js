/*
    this is a simple pure js framework for a light weight html table pagination
    created by Shamrat Akbar
    it's free for any kinds of use and modification
    Date: 26/08/17
*/

(function(){

    this.SimplePagination = function(){

        this.tableId    = "";
        this.numRows    = 0;
        this.rowPerPage = 5;
        this.tr         = [];
        this.th         = "";
        this.rowPerPage = 5;
        this.pageCount  = 0;
        this.table  = "";

        var defaults ={

        }
        if (arguments[0] && typeof arguments[0] == "object") {
            this.tableId = arguments[0].tableId;
            this.rowPerPage = arguments[0].rowPerPage;

            console.log(arguments[0]);
        }
        initialize.call(this)


    }
    SimplePagination.prototype.sort = function(page) {
        console.log(this.table);
        var rows = this.th;
        var startIndex = ((this.rowPerPage * page) - this.rowPerPage);

        for (var i = startIndex; i < (startIndex+this.rowPerPage) && i < this.tr.length; i++) {
            rows+=this.tr[i];
        }
        this.table.innerHTML = rows;
        var object = this;
        var isFirstInit = false; 
        // create the pagination buttons
        document.getElementById("buttons").innerHTML = pageButtons(this.pageCount,page);
        // CSS Stuff
        document.getElementById("id"+page).setAttribute("class","pagination-button active");
        
        if (!isFirstInit) { 
            var buttons =  document.getElementsByClassName('pagination-button');
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].addEventListener("click", function(){
                    object.sort(this.dataset.pageno);
                });
            }
            isFirstInit = true;
        }
    };

    function initialize() {
        this.table = document.getElementById(this.tableId);
        console.log(this.table);
        this.numRows = this.table.rows.length;
        var firstRow = this.table.rows[0].firstElementChild.tagName;
        var hasHead  = (firstRow == "TH");
        this.tr = [];
        var loopStartFrom = (hasHead)?1:0;
        this.th = (hasHead ? this.table.rows[(0)].outerHTML:"");
        this.pageCount = Math.ceil(this.numRows/this.rowPerPage);

        if (this.pageCount > 1) {

            for (var i = loopStartFrom, ii=0; i < this.numRows; i++,ii++) {
                this.tr[ii] = this.table.rows[i].outerHTML;
            }
            this.table.insertAdjacentHTML("afterend","<div id='buttons'></div");
            this.sort(1);
        }
    }

    function pageButtons(pCount,cur) {
        var prevDis = (cur == 1)?"disabled":"",
            nextDis = (cur == pCount)?"disabled":"",
            /* this (buttons) will hold every single button needed
            ** it will creates each button and sets the onclick attribute
            ** to the "sort" function with a special (p) number..
            */
            buttons = "<input type='button' class='pagination-button' data-pageno='"+(cur - 1)+"' value='&lt;&lt; Prev' "+prevDis+">";
        for (i=1; i<=pCount;i++)
            buttons += "<input type='button' class='pagination-button' data-pageno='"+(i)+"' id='id"+i+"'value='"+i+"'>";
        buttons += "<input type='button' class='pagination-button' data-pageno='"+(cur - 1)+"' value='Next &gt;&gt;' "+nextDis+">";
        return buttons;
    }



}());