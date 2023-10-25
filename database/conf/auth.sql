# 권한 설정
grant all privileges on  *.* to 'root'@'%' identified by 'min0539';
delete from mysql.user where host="localhost" and user="root";

# root와 manager 패스워드 다르게 설정할 것
CREATE USER 'manager2'@'%' identified by 'min05390';
grant all privileges on  bookdb.* to 'manager2'@'%';

flush privileges;
select host,user,plugin,authentication_string from mysql.user;