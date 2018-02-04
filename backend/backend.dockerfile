FROM python:3.6.4-alpine3.7

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
ADD . /code/

WORKDIR /code/
RUN apk add --no-cache postgresql-dev gcc python3-dev musl-dev  # psycopg2 dependencies

RUN pip install -r requirements.txt
