import React, { useEffect, useState } from "react";
import qs from 'query-string'

import StudentSearchBar from "../../components/StudentSearchBar";
import StudentTable from "../../components/StudentTable";
import { searchStudents } from "../../services/student";
// part4 分页组件
import Pager from "../../components/common/Pager";
// part 1 先实现url获取参数

/**
 * 该函数用于获取地址栏参数中提供的查询条件，返回一个对象
 * 如果某些条件在地址中缺失，该函数会使用默认值
 */
function getQuery (search) { 
    const queryDefault = {
        page: 1, 
        limit: 10,
        key: '',
        sex:-1
    }
    let query = qs.parse(search)
    query = {
        ...queryDefault,
        ...query
    }
    query.limit = +query.limit
    query.page = +query.page
    query.sex = +query.sex
    return query
}

// part3 获取响应数据
function useResp (query) { 
    const [resp,setResp] = useState({
        cont: 0,
        datas:[]
    })
    // 异步请求放在effect中
    useEffect(() => { 
        searchStudents({
            key: query.key,
            limit: query.limit,
            sex: query.sex,
            page: query.page
        }).then(resp => {
            setResp(resp)
        })
    }, [query.key, query.limit, query.sex, query.page])
    return resp
}

// part5 实现只改变url参数
function changeLocation (query, history) {
    const search = qs.stringify(query)
    history.push(("?"+search))
}

export default function StudentList (props) {
    const query = getQuery(props.location.search)
    console.log('query', query);


    //part3 服务器请求数据
    const resp = useResp(query)
    console.log('resp', resp);
    return (
        <div>
            {/* part2 searchBar */}
            <StudentSearchBar defaultValue={ {
                key: query.key,
                sex: query.sex
            } }
                onSearch={ (cod) => {
                    const newQuery = {
                        ...query,
                        key: cod.key,
                        sex: cod.sex,
                        page:1
                    }
                    console.log('newQuery', newQuery)
                    changeLocation(newQuery, props.history);
                 }
                }
            >
                
            
            </StudentSearchBar>
            <StudentTable
                stus={ resp.datas}
            ></StudentTable>
            <Pager current={ query.page }
                total={ resp.cont }
                limit={ query.limit }
                panelNumber={ 5 }
                onPageChange={ 
                    newPage => { 
                        const newQuery = {
                            ...query, page: newPage
                        }
                        changeLocation(newQuery, props.history)
                    }
                }></Pager>
        </div>


  )
}


