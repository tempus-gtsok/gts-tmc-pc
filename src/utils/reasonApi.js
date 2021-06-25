import home from '@/api/home.js';
 export default  {
     async reason_api(){
        let res = await home.reasonList()
        console.log(res)
        if(res.code != 200) {
            console.log(res.message)
            //  this.$message.(res.message)
             return
        }
        return  res.data.filter((item) => item.isDisplay == 1 && item.apprvType == 1)
    }
}