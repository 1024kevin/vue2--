function getData(id) {
    //console.log(id);
    this.axios.get('./data.json').then(res => {
      console.log(res);
      if (res.status == 200) {
        let datalist = res.data.data
        if (id == "week") {
          this.datalist1 = []
          let sum = 0;
          datalist.er.forEach((item, index) => {
            sum += item;
            if ((index + 1) % 7 == 0) {
              this.datalist1.push(sum);
              sum = 0;
            }
          });
          datalist.san.forEach((item, index) => {
            sum += item;
            // console.log(datalist1);
            if ((index + 1) % 7 == 0) {
              this.datalist1.push(sum);
              sum = 0;
            }
            if (index == 30) {
              this.datalist1.push(sum);
              sum = 0; 
            }
          });
          this.option.xAxis.data = ["2月第1周", "2月第2周", "2月第3周", "2月第4周", "3月第1周", "3月第2周", "3月第3周", "3月第4周", "3月第5周"]
          this.option.series[0].data = this.datalist1
         
          myChart.setOption(option,true);
        }
        else if (id == "month") {
          this.datalist1 = []
          let sum = 0;
          datalist.er.forEach((item, index) => {
            sum += item;
          }
          );
          this.datalist1.push(sum)
          sum = 0;
          datalist.san.forEach((item, index) => {
            sum += item;
          }
          );
          this.datalist1.push(sum)
          sum = 0;


          this.option.xAxis.data = ["2月", "3月"]

          this.option.series = [
            // y 轴数据
            {
              data: this.datalist1,
              type: "bar",
            },
          ],
            console.log(option.series[0].data);
          myChart.setOption(option, true);
         
        }
      }
    })
  }
