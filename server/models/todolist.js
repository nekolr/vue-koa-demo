import db from '../config/db.js' // 引入todolist的表结构
const todoModel = '../schema/list.js'
const TodolistDb = db.Todolist // 引入数据库

const Todolist = TodolistDb.import(todoModel)

const getTodolistById = async function (id) {
  const todolist = await Todolist.findAll({ // 查找全部的todolist
    where: {
      user_id: id
    },
    attributes: ['id', 'content', 'status', 'create_time', 'finish_time'] // 只需返回这几个字段的结果即可
  })

  return todolist // 返回数据
}

const createTodolist = async function (data) {
  await Todolist.create({
    user_id: data.id,
    content: data.content,
    status: data.status,
    create_time: data.create_time
  })
  return true
}

const removeTodolist = async function (id, userId) {
  const result = await Todolist.destroy({
    where: {
      id,
      user_id: userId
    }
  })
  return result === 1 // 如果成功删除了记录，返回1，否则返回0
}

const updateTodolist = async function (id, userId, status, finishTime) {
  const result = await Todolist.update(
    {
      status,
      finish_time: finishTime
    },
    {
      where: {
        id,
        user_id: userId
      }
    }
  )
  return result[0] === 1 // 返回一个数组，更新成功的条目为1否则为0。由于只更新一个条目，所以只返回一个元素
}

export default {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}
