export const mockRequest = async (params, resData) => {
  await sleep(1000);
  return cloneDeep(resData);
};

export const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
