create table flavours (
	id serial primary key,
	name varchar(100)
);

create table cakes (
	id serial primary key,
	name varchar(100) not null,
	flavour_id integer not null references flavours(id),
	price numeric not null,
	image varchar(255),
	description text not null
);

create table clients (
	id serial primary key,
	name varchar(100) not null,
	address varchar(255),
	phone varchar(13) not null
);

create table orders (
	id serial primary key,
	client_id integer not null references clients(id),
	cake_id integer not null references cakes(id),
	quantity integer not null default 1,
	created_at timestamp not null default now(),
	total_price numeric not null
);