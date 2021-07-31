exports.error = ( ) =>{
  return {
      err: true,
      msg: "Some thing went wrong",
      error : [],
    };
}

exports.success = ( ) =>{
  return {
    err: false,
      msg: "success",
      payload: [],
  }
}
