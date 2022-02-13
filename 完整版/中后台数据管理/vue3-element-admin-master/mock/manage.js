const mockList = [
    {
        "id": 1,
        "title": "杨大",
        "abstracts": "12345678900",
        "author": "1234345@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 2,
        "title": "杨二",
        "abstracts": "12345671900",
        "author": "1334345@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 3,
        "title": "杨三",
        "abstracts": "13345678900",
        "author": "11234345@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 4,
        "title": "杨四",
        "abstracts": "12345678910",
        "author": "12334345@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 5,
        "title": "杨五",
        "abstracts": "12345678901",
        "author": "12343435@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 6,
        "title": "杨六",
        "abstracts": "12345678912",
        "author": "123434565@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 7,
        "title": "杨七",
        "abstracts": "12345178900",
        "author": "121343445@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 8,
        "title": "杨八",
        "abstracts": "12343678900",
        "author": "122134345@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 9,
        "title": "杨九",
        "abstracts": "12345678800",
        "author": "123412345@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 10,
        "title": "杨十",
        "abstracts": "12345678945",
        "author": "123434534@qq.com",
        "publishDate": "",
        "content": "管理员"
    },
    {
        "id": 11,
        "title": "杨十一",
        "abstracts": "12335678900",
        "author": "1234123345@qq.com",
        "publishDate": "",
        "content": "管理员"
    }
]


export default [
    {
        url: '/manage/list',
        type: 'get',
        response: config => {
            const { current = 1, size = 20 } = config.query
            const pageList = mockList.filter((item, index) => index < size * current && index >= size * (current - 1))
            return {
                code: 0,
                data: pageList,
                total: mockList.length
            }
        }
    },

    {
        url: '/manage/delete',
        type: 'get',
        response: config => {
            console.log(config, "xxxxxxxxxxxxxxx")
            const id = config.query.id;
            const index = mockList.findIndex(item => {
                if (item.id == id) {
                    return true;
                }
            })
            mockList.splice(index, 1)
            console.log("id是", id)
            return {
                code: 0,
                data: '删除成功'
            }
        }
    },
]