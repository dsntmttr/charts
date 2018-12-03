$(function(){

chart = null;
    var pollSaftyCheck = false;
    var timeOut;
    function doAll(){
        
        currentTimeLapse = $('.control-buttons.active').attr('id');
        currentChartMode = $('.chart-mode.active').attr('id');

        $.ajax({
            type: "GET",
            url: "https://www.bitmarket.pl/graphs/BTCPLN/" + currentTimeLapse + ".json",
            success: function (data) {
                currentOHCL = [];
                currentVolume = [];
                currentLows = [];
                currentHighs = [];
                currentMinMaxTime = [];
                for (i in data) {

                    currentOHCL.push([(data[i].time) * 1000, Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]);
                    currentVolume.push([(data[i].time) * 1000, Number(data[i].vol)]);
                    currentHighs.push(Number(data[i].high));
                    currentLows.push(Number(data[i].low));
                    currentMinMaxTime.push((data[i].time) * 1000);

                }
                minAxisTick = Math.floor(Math.min.apply(null, currentLows) - ((Math.max.apply(null, currentHighs) - Math.min.apply(null, currentLows)) / 30));
                maxAxisTick = Math.ceil(Math.max.apply(null, currentHighs) + ((Math.max.apply(null, currentHighs) - Math.min.apply(null, currentLows)) / 30));

                if(chart){
                    chart.destroy();
                }

                var plotsetOhlc = {
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
                            min: currentMinMaxTime[0],
                            max: currentMinMaxTime[currentMinMaxTime.length-1],
                            numberTicks: 9,
                            renderer: $.jqplot.DateAxisRenderer,
                            tickOptions: {formatString: '%H:%M'}
                        },
                        yaxis: {
                            min: minAxisTick,
                            max: maxAxisTick,
                            numberTicks: 11
                        },
                        y2axis: {
                            numberTicks: 11

                        }

                    }};
                var plotsetLine = {
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
                            min: currentMinMaxTime[0],
                            max: currentMinMaxTime[currentMinMaxTime.length-1],
                            numberTicks: 9,
                            renderer: $.jqplot.DateAxisRenderer,
                            tickOptions: {formatString: '%m-%Y'}
                        },
                        yaxis: {
                            min: Math.floor(Math.min.apply(null, currentLows) - ((Math.max.apply(null, currentHighs) - Math.min.apply(null, currentLows)) / 30)),
                            max: Math.ceil(Math.max.apply(null, currentHighs) + ((Math.max.apply(null, currentHighs) - Math.min.apply(null, currentLows)) / 30)),
                            numberTicks: 11
                        },
                        y2axis: {
                            numberTicks: 11

                        }

                    }};
                var plotsets = { ohlc : plotsetOhlc, line: plotsetLine };

                chart = $.jqplot('chart3', [currentVolume, currentOHCL], plotsets[currentChartMode]);
                pollOhlc();
            }
        });
    }
    function pollOhlc(){

        if(pollSaftyCheck===false){
            pollSaftyCheck=true;
            doAll();
        } else{
            timeOut = setTimeout(doAll, 10000);
        }
    }

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
            pollOhlc();
        }
    });
    $('.control-buttons').on("click", function(){
        issuedButton = $(this);
        if(!issuedButton.hasClass("disabled")){
            $(".control-buttons").removeClass("disabled active");
            issuedButton.addClass("disabled active");
            clearTimeout(timeOut);
            pollSaftyCheck=false;
            pollOhlc();
        }
    });
    pollOhlc();
});

// pollOhlc(issuedButton.attr('id'),null);
/*
 $.ajax({
 url: "https://www.bitmarket.pl/json/BTCPLN/orderbook.json",
 success: function(data) {
 asks = [];
 bids = [];
 q = 0;
 a = 0;
 for(i in data.asks){
 if(data.asks[i][0]<3250){
 asks.push([data.asks[i][0], q = q + data.asks[i][1]])
 }}
 for(i in data.bids){
 if(data.bids[i][0]>1930)
 bids.push([data.bids[i][0], a = a + data.bids[i][1]])
 }
 if(asks[asks.length-1][1]>bids[bids.length-1][1]){
 maxVolume = asks[asks.length-1][1];
 }else {
 maxVolume = bids[bids.length-1][1];
 }
 plotsetDepth = {
 series: [{
 showMarker: false,
 fill: true,
 color: "#9C27B0"
 },
 {
 showMarker: false,
 fill: true,
 color: "#009688"
 }
 ],
 axes: {
 xaxis: {
 min: bids[bids.length-1][0],
 max: asks[asks.length-1][0],
 numberTicks: 9
 },
 yaxis: {
 min: 0,
 max: Math.ceil(maxVolume + (maxVolume / 10)),
 numberTicks: 11
 }
 }
 };
 plotDepth = $.jqplot('chart3', [asks, bids], plotsetDepth);
 }
 });
 */
// poll function previous
/*
 (function pollOhlc(){
 timeLapse = $('.control-buttons.active').attr('id');

 $.ajax({
 type: "GET",
 url: "https://www.bitmarket.pl/graphs/BTCPLN/" + timeLapse + ".json",
 success: function (data) {
 currentOHCL = [];
 currentVolume = [];
 currentLows = [];
 currentHighs = [];
 currentMinMaxTime = [];
 for (i in data) {

 currentOHCL.push([(data[i].time) * 1000, Number(data[i].open), Number(data[i].high), Number(data[i].low), Number(data[i].close)]);
 currentVolume.push([(data[i].time) * 1000, Number(data[i].vol)]);
 currentHighs.push(Number(data[i].high));
 currentLows.push(Number(data[i].low));
 currentMinMaxTime.push((data[i].time) * 1000);

 }
 minAxisTick = Math.floor(Math.min.apply(null, currentLows) - ((Math.max.apply(null, currentHighs) - Math.min.apply(null, currentLows)) / 30));
 maxAxisTick = Math.ceil(Math.max.apply(null, currentHighs) + ((Math.max.apply(null, currentHighs) - Math.min.apply(null, currentLows)) / 30));

 if(chart){
 chart.destroy();
 }if(chart1){
 chart1.destroy();
 }
 var plotsetOhlc = {
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
 min: currentMinMaxTime[0],
 max: currentMinMaxTime[currentMinMaxTime.length-1],
 numberTicks: 9,
 renderer: $.jqplot.DateAxisRenderer,
 tickOptions: {formatString: '%H:%M'}
 },
 yaxis: {
 min: minAxisTick,
 max: maxAxisTick,
 numberTicks: 11
 },
 y2axis: {
 numberTicks: 11

 }

 }

 };
 var plotsetLine = {
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
 min: currentMinMaxTime[0],
 max: currentMinMaxTime[currentMinMaxTime.length-1],
 numberTicks: 9,
 renderer: $.jqplot.DateAxisRenderer,
 tickOptions: {formatString: '%m-%Y'}
 },
 yaxis: {
 min: Math.floor(Math.min.apply(null, currentLows) - ((Math.max.apply(null, currentHighs) - Math.min.apply(null, currentLows)) / 30)),
 max: Math.ceil(Math.max.apply(null, currentHighs) + ((Math.max.apply(null, currentHighs) - Math.min.apply(null, currentLows)) / 30)),
 numberTicks: 11
 },
 y2axis: {
 numberTicks: 11

 }

 }

 };

 chartMode = $('.chart-mode.active').attr('id');

 console.log(chartMode);

 if(chartMode == 'line') {
 chart = $.jqplot('chart3', [currentVolume, currentOHCL], plotsetLine);
 } else {
 chart = $.jqplot('chart3', [currentVolume, currentOHCL], plotsetOhlc);
 }

 }
 });
 setTimeout(pollOhlc, 30000);
 })();
*/
//button
/*
 $('#90m').on('click', function() {
 plot1.destroy();
 plot1 = $.jqplot('chartDiv', [bitmarketVolume90m, bitmarketOHCL90m], plotset);

 });
 */

//area
/*
 var plotset = {
 title: 'BTC/PLN',
 gridPadding: {
 right: 40,
 left: 40
 },
 cursor: {
 show: true,
 showTooltip: false,
 showVerticalLine: true,
 showHorizontalLine: false
 },
 seriesDefaults: {
 showMarker: false
 },
 series: [{
 color: '#BAEEFF',
 renderer: $.jqplot.BarRenderer,
 yaxis: 'y2axis',
 rendererOptions: {
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
 show: true,
 showTooltip: false
 },
 color: '#2E8026',
 renderer: $.jqplot.OHLCRenderer,
 rendererOptions: {candleStick: true}
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
 min: (bitmarketMinMaxTime90m[0]),
 max: bitmarketMinMaxTime90m[89],
 numberTicks: 9,
 renderer: $.jqplot.DateAxisRenderer,
 tickOptions: {formatString: '%H:%M'}
 },
 yaxis: {
 min: Math.floor(Math.min.apply(null, bitmarketMinMax90m)-Math.min.apply(null, bitmarketMinMax90m)/400),
 max: Math.ceil(Math.max.apply(null, bitmarketMinMax90m)+Math.max.apply(null, bitmarketMinMax90m)/400),
 numberTicks: 11
 },
 y2axis: {
 numberTicks: 11

 }

 }

 };
 var plotset1 = {
 title: 'BTC/PLN',
 gridPadding: {
 right: 40,
 left: 40
 },
 cursor: {
 style: 'crosshair',
 show: true,
 zoom: false,
 showTooltip: false,
 tooltipOffset: 10,
 tooltipLocation: 'nw',
 showVerticalLine: true,
 showCursorLegend: true,
 cursorLegendFormatString: '%s <span class="hidden">%s</span><span class="right">%s</span>',
 tooltipAxisGroups: [['xaxis', 'yaxis']]
 },

 series: [{
 color: '#BAEEFF',
 renderer: $.jqplot.BarRenderer,
 yaxis: 'y2axis',
 rendererOptions: {
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
 tooltipContentEditor: function (str, seriesIndex, pointIndex, plot1) {

 var time = plot1.data[seriesIndex][pointIndex][0];
 var open = plot1.series[seriesIndex].data[pointIndex][1];
 var high = plot1.series[seriesIndex].data[pointIndex][2];
 var low = plot1.series[seriesIndex].data[pointIndex][3];
 var close = plot1.series[seriesIndex].data[pointIndex][4];
 var volume = plot1.series[0].data[pointIndex][1];

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
 color: '#2E8026',
 renderer: $.jqplot.OHLCRenderer,
 rendererOptions: {candleStick: true}
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
 min: bitmarketMinMaxTime6h[0],
 max: bitmarketMinMaxTime6h[89],
 numberTicks: 9,
 renderer: $.jqplot.DateAxisRenderer,
 tickOptions: {formatString: '%H:%M'}
 },
 yaxis: {
 min: Math.floor(Math.min.apply(null, bitmarketMinMax6h)-Math.min.apply(null, bitmarketMinMax6h)/400),
 max: Math.ceil(Math.max.apply(null, bitmarketMinMax6h)+Math.max.apply(null, bitmarketMinMax6h)/400),
 numberTicks: 11
 },
 y2axis: {
 numberTicks: 11

 }

 }

 };
 var plotset2 = {
 title: 'BTC/PLN',
 gridPadding: {
 right: 40,
 left: 40
 },
 cursor: {
 show: true,
 zoom: false,
 tooltipOffset: 10,
 tooltipLocation: 'nw',
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
 tooltipContentEditor: function (str, seriesIndex, pointIndex, plot1) {

 var time = plot1.data[seriesIndex][pointIndex][0];
 var open = plot1.series[seriesIndex].data[pointIndex][1];
 var high = plot1.series[seriesIndex].data[pointIndex][2];
 var low = plot1.series[seriesIndex].data[pointIndex][3];
 var close = plot1.series[seriesIndex].data[pointIndex][4];
 var volume = plot1.series[0].data[pointIndex][1];

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
 min: bitmarketMinMaxTime1d[0],
 max: bitmarketMinMaxTime1d[89],
 numberTicks: 9,
 renderer: $.jqplot.DateAxisRenderer,
 tickOptions: {formatString: '%H:%M'}
 },
 yaxis: {
 min: Math.floor(Math.min.apply(null, bitmarketMinMax1d)-Math.min.apply(null, bitmarketMinMax1d)/400),
 max: Math.ceil(Math.max.apply(null, bitmarketMinMax1d)+Math.max.apply(null, bitmarketMinMax1d)/400),
 numberTicks: 11
 },
 y2axis: {
 numberTicks: 11

 }

 }

 };





 var plotArea = null;


(function pollArea(){

        $.ajax({
            type: "GET",
            url: "https://www.bitmarket.pl/json/BTCPLN/orderbook.json",
            success: function (data) {
                asks = data.asks;
                bids = data.bids;
                console.log(data.asks.length);
                console.log(data.bids.length);
                if(plotArea){
                    plotArea.destroy();
                }
                var plotsetArea = {

                    seriesDefaults:{
                        fill: true,
                        fillAndStroke: true,
                        shadow: false
                    }

                };
                plotArea = $.jqplot('chart3', [asks, bids], plotsetArea);
            }
        });
        setTimeout(pollArea, 30000);
    })();

*/
//random garbage code
/*

var plot2 = null;

function fetchAjaxData(url, success) {
    $.ajax({
        url: "http://aleksandra-soft.com.pl/graph/BTCPLN/90m",
        dataType:"json",
        success: function(data) {
            success(data);
            console.log('loaded');
        }
    });
}

function createPlot(url) {
    fetchAjaxData(url, function(data) {
        if (plot2 == null) {
            plot2 = $.jqplot('chart2', data, {
                title: "AJAX JSON Data Renderer"
            });
        } else {
            plot2.replot({data: data});
            console.log('replotting');
        }
    });
}

$(document).ready(function(){
    var jsonurl = "./jsondata.txt";

    //Regenerate the plot on button click.
    $('#ajax-button').click(function() {
        createPlot(jsonurl);
    });

    //Generate the plot first time through.
    createPlot(jsonurl);
});

/*
 // le random js training
 function getLetters(targetClass) {
 var container = $(targetClass);
 var target = container.html();
 container.empty();
 for(i = 0; i <= target.length-1; i++){
 container.append('<span class="separated-letter">' + target.charAt(i) + '</span>');
 }
 }
 getLetters(".animated-text");



 */
/*
 var time = plot1.data[seriesIndex][pointIndex][0];
 var open = plot1.series[seriesIndex].data[pointIndex][1];
 var high = plot1.series[seriesIndex].data[pointIndex][2];
 var low = plot1.series[seriesIndex].data[pointIndex][3];
 var close = plot1.series[seriesIndex].data[pointIndex][4];
 var volume = plot1.series[0].data[pointIndex][1];

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

$(document).ready(function(){

    var ajaxDataRenderer = function(url, plot) {
        var ret = null;
        $.ajax({
            // have to use synchronous here, else returns before data is fetched
            async: false,
            url: url,
            dataType:'json',
            success: function(data) {
                ret = data;
            }
        });
        return ret;
    };

    var jsonurl = "./includes/data/jsondata.txt";


    plot2 = $.jqplot('chartDiv2', jsonurl,{
        title: 'AJAX JSON Data Renderer',
        dataRenderer: ajaxDataRenderer
    });

});


    $.jqplot.config.enablePlugins = true;

    s1 = [['23-May-08',1, 11],['24-May-08',4, 14],['25-May-08',2, 22],['26-May-08', 6, 26]];
    s2 = [['23-May-08',11, 1],['24-May-08',14, 4],['25-May-08',22, 2],['26-May-08', 26, 6]];

    plot = $.jqplot('chart',[s1, s2],{
        title: 'Highlighting, Dragging, Cursor and Trend Line',
        axes: {
            xaxis: {
                renderer: $.jqplot.DateAxisRenderer,
                tickOptions: {
                    formatString: '%#m/%#d/%y'
                },
                numberTicks: 4
            },
            yaxis: {
                tickOptions: {
                    formatString: '$%.2f'
                }
            }
        },
        highlighter: {
            show:true
        },
        cursor: {
            show: true
        },
        series: [
            {
                lineWidth: 2,
                highlighter: {
                    show: true,
                    tooltipContentEditor: function (str, seriesIndex, pointIndex, plot) {

                        var date = plot.data[seriesIndex][pointIndex][0];
                        var revenue = plot.series[seriesIndex].data[pointIndex][1];
                        var views = plot.series[seriesIndex].data[pointIndex][2];

                        var html = "<div>Date : ";
                        html += date;
                        html += "  <br>Money : ";
                        html += revenue;
                        html += "  <br>Views : ";
                        html += views;
                        html += "  </div>";

                        return html;
                    }
                }
            },
            {
                yaxis: 'y2axis',
                highlighter: {
                    show: true,
                    tooltipContentEditor: function (str, seriesIndex, pointIndex, plot) {

                        var date = plot.data[seriesIndex][pointIndex][0];
                        var views = plot.data[seriesIndex][pointIndex][5];
                        var revenue = plot.data[0][pointIndex][6];

                        var html = "<div>Date : ";
                        html += date;
                        html += "  <br>Money : ";
                        html += revenue;
                        html += "  <br>Views : ";
                        html += views;
                        html += "  </div>";

                        return html;
                    }
                }
            }]
    });



$('#update').on('click', function() {
 var jsonurl2 = "./includes/data/jsondata2.txt";
 plot2.destroy();
 plot2 = $.jqplot('chartDiv2', jsonurl2, {
 title: 'AJAX JSON Data Renderer',
 dataRenderer: ajaxDataRenderer
 });
 });
 var plot2 = null;

 function fetchAjaxData(url, success) {
 $.ajax({
 url: url,
 dataType:"json",
 success: function(data) {
 success(data);
 console.log('loaded');
 }
 });
 }

 function createPlot(url) {
 fetchAjaxData(url, function(data) {
 if (plot2 == null) {
 plot2 = $.jqplot('chart2', data, {
 title: "AJAX JSON Data Renderer"
 });
 } else {
 plot2.replot({data: data});
 console.log('replotting');
 }
 });
 }

 $(document).ready(function(){
 var jsonurl = "./jsondata.txt";

 //Regenerate the plot on button click.
 $('#ajax-button').click(function() {
 createPlot(jsonurl);
 });

 //Generate the plot first time through.
 createPlot(jsonurl);
 });
 */