FROM nginx

ENV TZ="Asia/Shanghai"

RUN mkdir -p /usr/share/zoneinfo/Asia/
RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
  echo 'Asia/Shanghai' >/etc/timezone

COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/web