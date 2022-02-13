const cashlist = [
    { "id": 1, "createTime": 1171211205701, "incomePayType": "2", "incomePayDes": "永恒回忆", "income": 298, "pay": 100, "accoutCash": 80.23, "remarks": "" },
    { "id": 2, "createTime": 1212112057011, "incomePayType": "3", "incomePayDes": "喜气洋洋", "income": 379, "pay": 100, "accoutCash": 3434, "remarks": "" },
    { "id": 3, "createTime": 1221211205701, "incomePayType": "5", "incomePayDes": "单品周花", "income": 358, "pay": 100, "accoutCash": 323.2323, "remarks": "" },
    { "id": 4, "createTime": 1231211205701, "incomePayType": "3", "incomePayDes": "生意兴隆", "income": 399, "pay": 123, "accoutCash": 434, "remarks": "" },
    { "id": 5, "createTime": 1241211205701, "incomePayType": "1", "incomePayDes": "我的女王", "income": 659, "pay": 123, "accoutCash": 12, "remarks": "" },
    { "id": 6, "createTime": 1251211205701, "incomePayType": "5", "incomePayDes": "混搭周花", "income": 396, "pay": 123, "accoutCash": 3489, "remarks": "" },
    { "id": 7, "createTime": 1261211205701, "incomePayType": "3", "incomePayDes": "大卖", "income": 298, "pay": 123, "accoutCash": 23, "remarks": "" }
]


export default [
    {
        url: '/cashflow/list',
        type: 'get',
        response: config => {
            let { incomePayType, current = 1, size = 20, sort } = config.query

            let mockList = cashlist.filter(item => {
                if (incomePayType && item.incomePayType !== +incomePayType) return false
                return true
            })
            if (sort) {
                sort = JSON.parse(sort);
            }
            if (sort && sort.prop == 'id') {
                mockList = sort.order == "ascending" ? mockList : mockList.reverse()
            }
            else if (sort && sort.prop == 'income') {
                if (sort.order == "ascending") {
                    mockList = mockList.sort((item1, item2) => {
                        return item1.income - item2.income
                    })
                }
                else {
                    mockList = mockList.sort((item1, item2) => {
                        return -item1.income + item2.income
                    })
                }
            }
            const pageList = mockList.filter((item, index) => index < size * current && index >= size * (current - 1))
            return {
                code: 0,
                data: pageList,
                total: mockList.length
            }
        }
    },
    {
        url: '/cashflow/list/:id',
        type: 'get',
        response: config => {
            const id = config.query.id;
            const current = cashlist.find(item => {
                return item.id == id;
            })
            return current;
        }
    },
    {
        url: '/cashflow/update',
        type: 'post',
        response: config => {
            const data = config.body;
            var index = cashlist.findIndex(item => {
                if (item.id == data.id) {
                    return true;
                }
            })
            cashlist[index] = data;
            return {
                code: 0,
                data: 'success'
            }
        }
    },
    {
        url: '/cashflow/delete',
        type: 'get',
        response: config => {
            const { id } = config.query;
            var index = cashlist.findIndex(item => {
                if (item.id == id) {
                    return true;
                }
            })
            cashlist.splice(index, 1)
            return {
                code: 0,
                data: 'success'
            }
        }
    },
    {
        url: '/cashflow/create',
        type: 'post',
        response: config => {
            const data = config.body;
            cashlist.push(data);
            return {
                code: 0,
                data: 'success'
            }
        }
    },
]