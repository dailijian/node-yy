<html>
  <head>
    <title>{{title}}</title>
    <style>
      table {
        border-collapse: collapse;
        border-spacing: 0;
      }
      
      td,th {
        padding: 0;
      }
      
      .pure-table {
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
        border: 1px solid #cbcbcb;
      }
      
      .pure-table caption {
        color: #000;
        font: italic 85%/1 arial,sans-serif;
        padding: 1em 0;
        text-align: center;
      }
      
      .pure-table td,.pure-table th {
        border-left: 1px solid #cbcbcb;
        border-width: 0 0 0 1px;
        font-size: inherit;
        margin: 0;
        overflow: visible;
        padding: .5em 1em;
      }
      
      .pure-table thead {
        background-color: #e0e0e0;
        color: #000;
        text-align: left;
        vertical-align: bottom;
        
      }
      .pure-table th {
        font-weight: 500;
        font-size: 15px;
      }

      
      .pure-table td {
        background-color: transparent;
        font-size: 14px;
      }
      
      .pure-table-bordered td {
        border-bottom: 1px solid #cbcbcb;
      }
      
      .pure-table-bordered tbody>tr:last-child>td {
        border-bottom-width: 0;
      }

      .pure-table-odd td {
        background-color: #f2f2f2;
      }
    </style>
  </head>
  <body>
    <h3>用户统计数据</h3>

    <table class="pure-table pure-table-bordered">
      <thead >
        <tr>
          <th colspan="3" style="text-align: center;border-bottom: 1px solid #cbcbcb;">司机端用户数据</th>
        </tr>
        <tr>
          <th></th>
          <th>Android</th>
          <th>iOS</th>
        </th>
      </thead>
  
      <tbody>
        <tr>
          <td>日活用户</td>
          <td>{{shijiDua.android.uv}}</td>
          <td>{{shijiDua.ios.uv}}</td>
        </tr>
        <tr>
          <td>启动次数</td>
          <td>{{''}}</td>
          <td>{{''}}</td>
        </tr>
      </tbody>
    </table>
    <br>

    <h3></h3>

    <table class="pure-table pure-table-bordered">
      <thead >
        <tr>
          <th colspan="3" style="text-align: center;border-bottom: 1px solid #cbcbcb;">司机端APP性能</th>
        </tr>
        <tr>
          <th></th>
          <th>Android</th>
          <th>iOS</th>
        </th>
      </thead>
  
      <tbody>
        <tr>
          <td>请求错误数</td>
          <td>{{requestErrorCount.andiordCount}}</td>
          <td>{{requestErrorCount.iosCount}}</td>
        </tr>
        <tr>
          <td>请求耗时2S以上次数</td>
          <td>{{requestOutTimeCount.andiordcount}}</td>
          <td>{{requestOutTimeCount.iosCount}}</td>
        </tr>
        <tr>
          <td>次数崩溃率</td>
          <td>{{requestErrorCount}}</td>
          <td>{{requestOutTimeCount}}</td>
        </tr>
        <tr>
          <td>用户崩溃率</td>
          <td>{{requestErrorCount}}</td>
          <td>{{requestOutTimeCount}}</td>
        </tr>
        <tr>
          <td>崩溃设备数</td>
          <td>{{requestErrorCount}}</td>
          <td>{{requestOutTimeCount}}</td>
        </tr>
      </tbody>
    </table>

    <h3></h3>

    <table class="pure-table pure-table-bordered">
      <thead >
        <tr>
          <th colspan="5" style="text-align: center;border-bottom: 1px solid #cbcbcb;">司机端物流业务指标</th>
        </tr>
        <tr>
          <th></th>
          <th>{{''}}月</th>
          <th>本周</th>
          <th>上周</th>
          <th>较上周</th>
        </tr>
      </thead>
  
      <tbody>
        <tr >
          <td>PV</td>
          <td>{{youhuoDAU.month.pv}}</td>
          <td>{{youhuoDAU.thisWeek.pv}}</td>
          <td>{{youhuoDAU.lastWeek.pv}}</td>
          <td>{{''}}</td>
        </tr>
        <tr >
          <td>UV</td>
          <td>{{youhuoDAU.month.uv}}</td>
          <td>{{youhuoDAU.thisWeek.uv}}</td>
          <td>{{youhuoDAU.lastWeek.uv}}</td>
          <td>{{''}}</td>
        </tr>
        <tr >
          <td>新增用户数</td>
          <td>{{''}}</td>
          <td>{{''}}</td>
          <td>{{''}}</td>
          <td>{{''}}</td>
        </tr>
        <tr >
          <td>留存率</td>
          <td>{{''}}</td>
          <td>{{''}}</td>
          <td>{{''}}</td>
          <td>{{''}}</td>
        </tr>
      </tbody>
    </table>
  </body>
</html>