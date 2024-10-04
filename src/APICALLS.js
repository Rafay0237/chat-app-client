
const submitData=async(endPoint,method,data)=>{
  try {
      const response = await fetch(process.env.REACT_APP_API_URL+endPoint, {
          method,
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      });
      const res = await response.json();
      return res
  }catch(err){
  console.log(err)
  }
}

const getData = async (endPoint) => {
  try {
    const res = await fetch(
      process.env.REACT_APP_API_URL + endPoint,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await res.json();
    return response
  }catch(err){
      console.log(err)
  }
}

const deleteData = async (endPoint,token) => {
try {
    const response = await fetch(process.env.REACT_APP_API_URL+endPoint, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    const res = await response.json();

    return res;

} catch (error) {
    console.error('Error:', error);
}
};


export {submitData,getData,deleteData}