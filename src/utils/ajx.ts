
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'
const axios = require('axios');

export async function validateReq<T>(option: T, vo: any) {
  const reqAllowanceVo = plainToClass<Object, Object>(vo, option)
  let errors = await validate(reqAllowanceVo)
  if (errors.length) {
    return errors.reduce((o: any[], n: any): string[] => {
      Object.keys(n.constraints).forEach((key: any) => {
        o.push(n.constraints[key])
      })
      return o
    }, []).join(', ')
  }
  return
}
export async function get<T, V>(url: string, option: T, vo?: V): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const errors = await validateReq<T>(option, vo)
      if (errors) {
        reject(errors);
      } else {
        axios({
          method: 'get',
          url: `${url}`,
          params: option
        })
          .then((response: any) => {
            resolve(response.data)
          })
          .catch((error: any) => {
            reject(error ? error.message : 'An unknown error');
          });
      }
    } catch (error) {
      reject(error || 'An unknown error');
    }
  })
}

export async function post<T, V>(url: string, option: T, vo?: V): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const errors = await validateReq<T>(option, vo)
      if (errors) {
        reject(errors);
      } else {
        axios({
          method: 'post',
          url: `${url}`,
          data: option
        })
          .then((response: any) => {
            resolve(response.data)
          })
          .catch((error: any) => {
            reject(error ? error.message : 'An unknown error');
          });
      }
    } catch (error) {
      reject(error || 'An unknown error');
    }
  })
}