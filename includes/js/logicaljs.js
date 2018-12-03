$(function(){
// skonczylem na extremach, problem z tworzeniem plotsetuf/ladowaniem do nich zew danych, badz tez dodawanie dodatkowo osobno do wykresu danych
   // chart = null;
    var pollSaftyCheck = false;
    var timeOut;



    function callPoll(){
        currentTimeLapse = $('.control-buttons.active').attr('id');
        currentChartMode = $('.chart-mode.active').attr('id');
        $.ajax({
            type: "GET",
            url: "https://www.bitmarket.pl/graphs/BTCPLN/" + currentTimeLapse + ".json",
            success: function (data) {
            	console.log(this);
                prepOHCLdata(data);
            	drawPoll();
    	        callTimeout();
            }
        });
    };

	function prepOHCLdata(data){
		var ohlc = [],
	    volumes = [],
	    lows = [],
	    highs = [],
	    dates = [];

	    for(i in data) {

	        ohlc.push([(data[i].time) * 1000, Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]);
	        volumes.push([(data[i].time) * 1000, Number(data[i].vol)]);
	        highs.push(Number(data[i].high));
	        lows.push(Number(data[i].low));
	        dates.push((data[i].time) * 1000);
	    }

	    return lows, highs, volumes, ohlc, dates;
    };
    function calcAxisExtremes(lows, highs){
    	var minAxisTick = Math.floor(Math.min.apply(null, lows) - ((Math.max.apply(null, highs) - Math.min.apply(null, lows)) / 30));
	    var maxAxisTick = Math.ceil(Math.max.apply(null, highs) + ((Math.max.apply(null, highs) - Math.min.apply(null, lows)) / 30));
    	return minAxisTick, maxAxisTick;
    }
    function calcDateExtremes(dates){
    	var minDate = dates[0];
    	var maxDate = dates[dates.length-1],;
    	return minDate, maxDate
    }
    function prepPlotset(){
    	
    }

	function callTimeout(){

        if(pollSaftyCheck===false){
            pollSaftyCheck=true;
            callPoll();
        } else{
            var timeOut = setTimeout(callPoll(), 10000);
        }
    };
    function drawPoll(volumesArr,ohlcArr,chartMode){
    	if(chart){
            chart.destroy();
        }
        var chart = $.jqplot('chart3', [volumesArr, ohlcArr], plotsets[chartMode]);
    };

	var plotsets = { 
		ohlc : {
            gridPadding: {
                right: 40,
                left: 40
            },
            cursor: {
                show: true,
                zoom: false,
                showTooltip: false,
                showVerticalLine: true,
                tooltipAxisGroups: [['xaxis', 'yaxis']]
            },

            series: [{
                color: '#cadff5',
                renderer: $.jqplot.BarRenderer,
                yaxis: 'y2axis',
                rendererOptions: {
                    shadowAlpha: 0,
                    highlightMouseOver: false,
                    showHighlight: false,
                    barMargin: 3,
                    barWidth: 8
                },
                cursorOptions: {
                    show: false
                }
            },
                {
                    highlighter: {
                        tooltipAxes: 'xy',
                        yvalues: 4,
                        tooltipContentEditor: function (str, seriesIndex, pointIndex, plotOhlc) {

                            var time = plotOhlc.data[seriesIndex][pointIndex][0];
                            var open = plotOhlc.series[seriesIndex].data[pointIndex][1];
                            var high = plotOhlc.series[seriesIndex].data[pointIndex][2];
                            var low = plotOhlc.series[seriesIndex].data[pointIndex][3];
                            var close = plotOhlc.series[seriesIndex].data[pointIndex][4];
                            var volume = plotOhlc.series[0].data[pointIndex][1];

                            var html = "<div>  D : ";
                            html += $.format.date(time, 'dd.MM HH:mm');
                            html += "  <br>O : ";
                            html += open;
                            html += "  <br>H : ";
                            html += high;
                            html += "  <br>L : ";
                            html += low;
                            html += "  <br>C : ";
                            html += close;
                            html += "  <br>V : ";
                            html += volume;
                            html += "  </div>";

                            return html;
                        }
                    },
                    color: '#666666',
                    renderer: $.jqplot.OHLCRenderer,
                    rendererOptions: {
                        candleStick: true,
                        upBodyColor: '#41BB19',
                        downBodyColor: '#D44119',
                        fillUpBody: true,
                        wickColor: '#666666',
                        openColor: '#666666',
                        closeColor: '#666666',
                        lineWidth: 1
                    }
                }],
            highlighter: {
                show: true,
                showMarker: false,
                fadeTooltip: true,
                tooltipFadeSpeed: 'slow'
            },
            axesDefaults: {
                pad: 0
            },
            axes: {
                xaxis: {
                    numberTicks: 9,
                    renderer: $.jqplot.DateAxisRenderer,
                    tickOptions: {formatString: '%H:%M'}
                },
                yaxis: {
                    numberTicks: 11
                },
                y2axis: {
                    numberTicks: 11

                }
            }
        },
        line: {
            gridPadding: {
                right: 40,
                left: 40
            },
            cursor: {
                show: true,
                zoom: false,
                showTooltip: false,
                showVerticalLine: true,
                tooltipAxisGroups: [['xaxis', 'yaxis']]
            },

            series: [{
                color: '#cadff5',
                renderer: $.jqplot.BarRenderer,
                yaxis: 'y2axis',
                rendererOptions: {
                    shadowAlpha: 0,
                    highlightMouseOver: false,
                    showHighlight: false,
                    barMargin: 3,
                    barWidth: 8
                },
                cursorOptions: {
                    show: false
                }
            },
                {
                    highlighter: {
                        tooltipAxes: 'xy',
                        yvalues: 4,
                        tooltipContentEditor: function (str, seriesIndex, pointIndex, plotOhlc) {

                            var time = plotOhlc.data[seriesIndex][pointIndex][0];
                            var open = plotOhlc.series[seriesIndex].data[pointIndex][1];
                            var high = plotOhlc.series[seriesIndex].data[pointIndex][2];
                            var low = plotOhlc.series[seriesIndex].data[pointIndex][3];
                            var close = plotOhlc.series[seriesIndex].data[pointIndex][4];
                            var volume = plotOhlc.series[0].data[pointIndex][1];

                            var html = "<div>  D : ";
                            html += $.format.date(time, 'dd.MM HH:mm');
                            html += "  <br>O : ";
                            html += open;
                            html += "  <br>H : ";
                            html += high;
                            html += "  <br>L : ";
                            html += low;
                            html += "  <br>C : ";
                            html += close;
                            html += "  <br>V : ";
                            html += volume;
                            html += "  </div>";

                            return html;
                        }
                    },
                    showMarker: false,
                    color: '#41BB19'
                }],
            highlighter: {
                show: true,
                showMarker: false,
                fadeTooltip: true,
                tooltipFadeSpeed: 'slow'
            },
            axesDefaults: {
                pad: 0
            },
            axes: {
                xaxis: {
                    numberTicks: 9,
                    renderer: $.jqplot.DateAxisRenderer,
                    tickOptions: {formatString: '%m-%Y'}
                },
                yaxis: {
                    numberTicks: 11
                },
                y2axis: {
                    numberTicks: 11

                }
            }
        }
    };
    
    $.ajax({
        url: "https://www.bitmarket.pl/json/BTCPLN/ticker.json",
        success: function(data) {
            tickerContainer = $("<tr></tr>").addClass('ticker-data');
            for(i in data){
                if(data[i] !== data.vwap){
                tickerContainer.append($("<td>"+data[i]+"</td>"));
                }
            }
            tickerContainer.insertAfter($(".table-heading"));
        }
    });
    $.ajax({
        url: "https://www.bitmarket.pl/json/BTCPLN/orderbook.json",
        success: function(data) {


            for(i in data.asks){
                totalAsk = 0;
                askContainer = $("<tr></tr>");
                for(a in data.asks[i]){
                    askContainer.append($("<td>"+data.asks[i][a]+"</td>"));
                    if(totalAsk == 0) {
                        totalAsk = totalAsk + data.asks[i][a];
                    }else {
                        totalAsk = totalAsk * data.asks[i][a];
                    }
                }
                askContainer.append($("<td>"+totalAsk+"</td>"));
                $("#askTable").append(askContainer);
            }


            for(i in data.bids){
                bidContainer = $("<tr></tr>");
                totalBid = 0;
                for(a in data.bids[i]){
                    bidContainer.append($("<td>"+data.bids[i][a]+"</td>"));
                    if(totalBid == 0) {
                        totalBid = totalBid + data.bids[i][a];
                    }else {
                        totalBid = totalBid * data.bids[i][a];
                    }
                }
                bidContainer.append($("<td>"+totalBid+"</td>"));
                $("#bidTable").append(bidContainer);
            }
        }
    });
    $.ajax({
        url: "https://www.bitmarket.pl/json/BTCPLN/trades.json",
        success: function(data) {

            for (i in data) {
                tradeContainer = $("<tr></tr>");
                tradeData = $("<td>"+$.format.date(data[i].date*1000, "dd/MM HH:mm")+"</td>"+"<td>"+data[i].price+"</td>"+"<td>"+data[i].amount+"</td>");
                tradeContainer.append(tradeData);
                $("#tradeTable").append(tradeContainer);
            }
        }
    });

    // dot on chart
    $("#chart3").bind('jqplotMouseMove', function(ev, gridpos, datapos, neighbor, data){
        var c_x = datapos.xaxis;
        var index_x = -1;
        var pos_index = 0;
        var low = 0;
        var high = data.data[1].length-1;
        while(high - low > 1){
            var mid = Math.round((low+high)/2);
            var current = data.data[1][mid][0];
            if(current <= c_x)
                low = mid;
            else
                high = mid;
        }
        if(data.data[1][low][0] == c_x){
            high = low;
            index_x = high;
        }else{
            var c_low = data.data[1][low][0];
            var c_high = data.data[1][high][0];
            if(Math.abs(c_low - c_x) < Math.abs(c_high - c_x)){
                index_x = low;
            }else{
                index_x = high;
            }
        }
        // marker and tooltip
        if(data.series[1].data[index_x]){
            var x = data.series[1].gridData[index_x][0];
            var y = data.series[1].gridData[index_x][1];
            var r = 2;
            var highlightCanvas = $(".jqplot-highlight-canvas")[0];
            var context = highlightCanvas.getContext('2d');
            context.clearRect(0,0,highlightCanvas.width,highlightCanvas.height);
            context.strokeStyle = 'rgba(102,102,102,1)';
            context.fillStyle = 'rgba(102,102,102,1)';
            context.beginPath();
            context.arc(x,y,r,0,Math.PI*2,true);
            context.closePath();
            context.stroke();
            context.fill();
            //dot on closest chart point
            var highlightTooltip = $(".jqplot-highlighter-tooltip");
            var time = data.data[1][index_x][0];
            var open =  data.data[1][index_x][1];
            var hhigh =  data.data[1][index_x][2];
            var llow =  data.data[1][index_x][3];
            var close = data.data[1][index_x][4];
            var volume = data.data[0][index_x][1];
            var html = "<div>  D : ";
            html += $.format.date(time, 'dd.MM HH:mm');
            html += "  <br>O : ";
            html += open;
            html += "  <br>H : ";
            html += hhigh;
            html += "  <br>L : ";
            html += llow;
            html += "  <br>C : ";
            html += close;
            html += "  <br>V : ";
            html += volume;
            html += "  </div>";

            highlightTooltip.html(html);
            highlightTooltip.css({'left': (x-60)+'px', 'top': (y-10)+'px', 'display': 'block'});
        }
    });

    $('.chart-mode').on("click", function(){
        issuedButton = $(this);
        if(!issuedButton.hasClass("disabled")){
            $(".chart-mode").removeClass("disabled active");
            issuedButton.addClass("disabled active");
            clearTimeout(timeOut);
            pollSaftyCheck=false;
            callTimeout();
        }
    });
    $('.control-buttons').on("click", function(){
        issuedButton = $(this);
        if(!issuedButton.hasClass("disabled")){
            $(".control-buttons").removeClass("disabled active");
            issuedButton.addClass("disabled active");
            clearTimeout(timeOut);
            pollSaftyCheck=false;
            callTimeout();
        }
    });
    callTimeout();
});