#!/usr/local/bin/node
//导入数据库操作模块
let db = require('./db/index')

var request = require('request')

var headers = {
  'User-Agent': 'Apipost client Runtime/+https://www.apipost.cn/'
};

var options = {
  url: 'http://jiugev.xyz/api.php/provide/vod/?ac=detail',
  //   url: 'https://video.xuanqi.pro/api.php/provide/vod/?ac=detail',
  headers: headers
};

function callback (error, response, body) {
  if (!error && response.statusCode == 200) {
    var json = JSON.parse(body)
    const videoList = []
    for (const i of json.list) {
      videoList.push(i)
    }

    // console.log(videoList.length)
    // console.log(videoList)
    for (let t = 0; t < videoList.length; t++) {
      let vod_name = videoList[t].vod_name
      let type_id = videoList[t].type_id
      let type_id_1 = videoList[t].type_id_1
      let group_id = videoList[t].group_id
      let vod_sub = videoList[t].vod_sub
      let vod_en = videoList[t].vod_en
      let vod_statu = videoList[t].vod_statu
      let vod_letter = videoList[t].vod_letter
      let vod_color = videoList[t].vod_color
      let vod_tag = videoList[t].vod_tag
      let vod_class = videoList[t].vod_class
      let vod_pic = videoList[t].vod_pic
      let vod_pic_thumb = videoList[t].vod_pic_thumb
      let vod_pic_slide = videoList[t].vod_pic_slide
      let vod_pic_screenshot = videoList[t].vod_pic_screenshot
      let vod_actor = videoList[t].vod_actor
      let vod_director = videoList[t].vod_director
      let vod_writer = videoList[t].vod_writer
      let vod_behind = videoList[t].vod_behind
      let vod_blurb = videoList[t].vod_blurb
      let vod_remarks = videoList[t].vod_remarks
      let vod_pubdate = videoList[t].vod_pubdate
      let vod_total = videoList[t].vod_total
      let vod_serial = videoList[t].vod_serial
      let vod_tv = videoList[t].vod_tv
      let vod_weekday = videoList[t].vod_weekday
      let vod_area = videoList[t].vod_area
      let vod_lang = videoList[t].vod_lang
      let vod_year = videoList[t].vod_year
      let vod_version = videoList[t].vod_version
      let vod_state = videoList[t].vod_state
      let vod_author = videoList[t].vod_author
      let vod_jumpurl = videoList[t].vod_jumpurl
      let vod_tpl = videoList[t].vod_tpl
      let vod_tpl_play = videoList[t].vod_tpl_play
      let vod_tpl_down = videoList[t].vod_tpl_down
      let vod_isend = videoList[t].vod_isend
      let vod_lock = videoList[t].vod_lock
      let vod_level = videoList[t].vod_level
      let vod_copyright = videoList[t].vod_copyright
      let vod_points = videoList[t].vod_points
      let vod_points_play = videoList[t].vod_points_play
      let vod_points_down = videoList[t].vod_points_down
      let vod_hits = videoList[t].vod_hits
      let vod_hits_day = videoList[t].vod_hits_day
      let vod_hits_week = videoList[t].vod_hits_week
      let vod_hits_month = videoList[t].vod_hits_month
      let vod_duration = videoList[t].vod_duration
      let vod_up = videoList[t].vod_up
      let vod_down = videoList[t].vod_down
      let vod_score = videoList[t].vod_score
      let vod_score_all = videoList[t].vod_score_all
      let vod_score_num = videoList[t].vod_score_num
      let vod_time = videoList[t].vod_time
      let vod_time_add = videoList[t].vod_time_add
      let vod_time_hits = videoList[t].vod_time_hits
      let vod_time_make = videoList[t].vod_time_make
      let vod_trysee = videoList[t].vod_trysee
      let vod_douban_id = videoList[t].vod_douban_id
      let vod_douban_score = videoList[t].vod_douban_score
      let vod_reurl = videoList[t].vod_reurl
      let vod_rel_vod = videoList[t].vod_rel_vod
      let vod_rel_art = videoList[t].vod_rel_art
      let vod_pwd = videoList[t].vod_pwd
      let vod_pwd_url = videoList[t].vod_pwd_url
      let vod_pwd_play = videoList[t].vod_pwd_play
      let vod_pwd_play_url = videoList[t].vod_pwd_play_url
      let vod_pwd_down = videoList[t].vod_pwd_down
      let vod_pwd_down_url = videoList[t].vod_pwd_down_url
      let vod_content = videoList[t].vod_content
      let vod_play_from = videoList[t].vod_play_from
      let vod_play_server = videoList[t].vod_play_server
      let vod_play_note = videoList[t].vod_play_note
      let vod_play_url = videoList[t].vod_play_url
      let vod_down_from = videoList[t].vod_down_from
      let vod_down_server = videoList[t].vod_down_server
      let vod_down_note = videoList[t].vod_down_note
      let vod_down_url = videoList[t].vod_down_url
      let vod_plot = videoList[t].vod_plot
      let vod_plot_name = videoList[t].vod_plot_name
      let vod_plot_detail = videoList[t].vod_plot_detail
      const sql = `select * from video where vod_name = ?`
      db.query(sql, vod_name, (err, results) => {
        if (err) console.log(err)
        if (results.length != 0) {
          const sql = `UPDATE  video set type_id=?, type_id_1=?, group_id=?,  vod_sub=?, vod_en=?, vod_status=?, vod_letter=?, vod_color=?, vod_tag=?, vod_class=?, vod_pic=?, vod_pic_thumb=?, vod_pic_slide=?, vod_pic_screenshot=?, vod_actor=?, vod_director=?, vod_writer=?, vod_behind=?, vod_blurb=?, vod_remarks=?, vod_pubdate=?, vod_total=?, vod_serial=?, vod_tv=?, vod_weekday=?, vod_area=?, vod_lang=?, vod_year=?, vod_version=?, vod_state=?, vod_author=?, vod_jumpurl=?, vod_tpl=?, vod_tpl_play=?, vod_tpl_down=?, vod_isend=?, vod_lock=?, vod_level=?, vod_copyright=?, vod_points=?, vod_points_play=?, vod_points_down=?, vod_hits=?, vod_hits_day=?, vod_hits_week=?, vod_hits_month=?, vod_duration=?, vod_up=?, vod_down=?, vod_score=?, vod_score_all=?, vod_score_num=?, vod_time=?, vod_time_add=?, vod_time_hits=?, vod_time_make=?, vod_trysee=?, vod_douban_id=?, vod_douban_score=?, vod_reurl=?, vod_rel_vod=?, vod_rel_art=?, vod_pwd=?, vod_pwd_url=?, vod_pwd_play=?, vod_pwd_play_url=?, vod_pwd_down=?, vod_pwd_down_url=?, vod_content=?, vod_play_from=?, vod_play_server=?, vod_play_note=?, vod_play_url=?, vod_down_from=?, vod_down_server=?, vod_down_note=?, vod_down_url=?, vod_plot=?, vod_plot_name=?, vod_plot_detail=? where vod_name = ?`
          db.query(sql, [`${type_id}`, `${type_id_1}`, `${group_id}`, `${vod_sub}`, `${vod_en}`, `${vod_statu}`, `${vod_letter}`, `${vod_color}`, `${vod_tag}`, `${vod_class}`, `${vod_pic}`, `${vod_pic_thumb}`, `${vod_pic_slide}`, `${vod_pic_screenshot}`, `${vod_actor}`, `${vod_director}`, `${vod_writer}`, `${vod_behind}`, `${vod_blurb}`, `${vod_remarks}`, `${vod_pubdate}`, `${vod_total}`, `${vod_serial}`, `${vod_tv}`, `${vod_weekday}`, `${vod_area}`, `${vod_lang}`, `${vod_year}`, `${vod_version}`, `${vod_state}`, `${vod_author}`, `${vod_jumpurl}`, `${vod_tpl}`, `${vod_tpl_play}`, `${vod_tpl_down}`, `${vod_isend}`, `${vod_lock}`, `${vod_level}`, `${vod_copyright}`, `${vod_points}`, `${vod_points_play}`, `${vod_points_down}`, `${vod_hits}`, `${vod_hits_day}`, `${vod_hits_week}`, `${vod_hits_month}`, `${vod_duration}`, `${vod_up}`, `${vod_down}`, `${vod_score}`, `${vod_score_all}`, `${vod_score_num}`, `${vod_time}`, `${vod_time_add}`, `${vod_time_hits}`, `${vod_time_make}`, `${vod_trysee}`, `${vod_douban_id}`, `${vod_douban_score}`, `${vod_reurl}`, `${vod_rel_vod}`, `${vod_rel_art}`, `${vod_pwd}`, `${vod_pwd_url}`, `${vod_pwd_play}`, `${vod_pwd_play_url}`, `${vod_pwd_down}`, `${vod_pwd_down_url}`, `${vod_content}`, `${vod_play_from}`, `${vod_play_server}`, `${vod_play_note}`, `${vod_play_url}`, `${vod_down_from}`, `${vod_down_server}`, `${vod_down_note}`, `${vod_down_url}`, `${vod_plot}`, `${vod_plot_name}`, `${vod_plot_detail}`, `${vod_name}`], (err, results) => {
            if (err) console.log(err)
            console.log(results)
          })
        } else {
          const sql = `INSERT INTO video (type_id, type_id_1, group_id, vod_name, vod_sub, vod_en, vod_status, vod_letter, vod_color, vod_tag, vod_class, vod_pic, vod_pic_thumb, vod_pic_slide, vod_pic_screenshot, vod_actor, vod_director, vod_writer, vod_behind, vod_blurb, vod_remarks, vod_pubdate, vod_total, vod_serial, vod_tv, vod_weekday, vod_area, vod_lang, vod_year, vod_version, vod_state, vod_author, vod_jumpurl, vod_tpl, vod_tpl_play, vod_tpl_down, vod_isend, vod_lock, vod_level, vod_copyright, vod_points, vod_points_play, vod_points_down, vod_hits, vod_hits_day, vod_hits_week, vod_hits_month, vod_duration, vod_up, vod_down, vod_score, vod_score_all, vod_score_num, vod_time, vod_time_add, vod_time_hits, vod_time_make, vod_trysee, vod_douban_id, vod_douban_score, vod_reurl, vod_rel_vod, vod_rel_art, vod_pwd, vod_pwd_url, vod_pwd_play, vod_pwd_play_url, vod_pwd_down, vod_pwd_down_url, vod_content, vod_play_from, vod_play_server, vod_play_note, vod_play_url, vod_down_from, vod_down_server, vod_down_note, vod_down_url, vod_plot, vod_plot_name, vod_plot_detail) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
          db.query(sql, [`${type_id}`, `${type_id_1}`, `${group_id}`, `${vod_name}`, `${vod_sub}`, `${vod_en}`, `${vod_statu}`, `${vod_letter}`, `${vod_color}`, `${vod_tag}`, `${vod_class}`, `${vod_pic}`, `${vod_pic_thumb}`, `${vod_pic_slide}`, `${vod_pic_screenshot}`, `${vod_actor}`, `${vod_director}`, `${vod_writer}`, `${vod_behind}`, `${vod_blurb}`, `${vod_remarks}`, `${vod_pubdate}`, `${vod_total}`, `${vod_serial}`, `${vod_tv}`, `${vod_weekday}`, `${vod_area}`, `${vod_lang}`, `${vod_year}`, `${vod_version}`, `${vod_state}`, `${vod_author}`, `${vod_jumpurl}`, `${vod_tpl}`, `${vod_tpl_play}`, `${vod_tpl_down}`, `${vod_isend}`, `${vod_lock}`, `${vod_level}`, `${vod_copyright}`, `${vod_points}`, `${vod_points_play}`, `${vod_points_down}`, `${vod_hits}`, `${vod_hits_day}`, `${vod_hits_week}`, `${vod_hits_month}`, `${vod_duration}`, `${vod_up}`, `${vod_down}`, `${vod_score}`, `${vod_score_all}`, `${vod_score_num}`, `${vod_time}`, `${vod_time_add}`, `${vod_time_hits}`, `${vod_time_make}`, `${vod_trysee}`, `${vod_douban_id}`, `${vod_douban_score}`, `${vod_reurl}`, `${vod_rel_vod}`, `${vod_rel_art}`, `${vod_pwd}`, `${vod_pwd_url}`, `${vod_pwd_play}`, `${vod_pwd_play_url}`, `${vod_pwd_down}`, `${vod_pwd_down_url}`, `${vod_content}`, `${vod_play_from}`, `${vod_play_server}`, `${vod_play_note}`, `${vod_play_url}`, `${vod_down_from}`, `${vod_down_server}`, `${vod_down_note}`, `${vod_down_url}`, `${vod_plot}`, `${vod_plot_name}`, `${vod_plot_detail}`], (err, results) => {
            if (err) console.log(err)
            console.log(results)
          })
        }
      })
    }
  }
}
request(options, callback)



