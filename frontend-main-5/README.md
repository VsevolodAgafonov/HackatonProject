# frontend

## DockerFile

- Перенести директории login и user

```Bash
FROM nginx
COPY static-html-directory /usr/share/nginx/html
```

- Перенести файл конфигурации

```Bash
FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
```

- Запустить контейнер

```Bash
$ docker run --name some-nginx -d -p 8080:80 some-content-nginx
```
