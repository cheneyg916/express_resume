const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ name: '程序员', website: 'https://chengxuyuan.co0' });
});

router.post('/new', (req, res) => {
  res.status(201).json({ msg: '新的篇章，即将开始' });
});

module.exports = router;