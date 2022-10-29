CREATE TABLE addresses
(
    id        INTEGER NOT NULL,
    country   VARCHAR(255),
    region    VARCHAR(255),
    city      VARCHAR(255),
    post_code VARCHAR(255),
    street    VARCHAR(255),
    house     VARCHAR(255),
    apartment VARCHAR(255),
    CONSTRAINT pk_addresses PRIMARY KEY (id)
);

CREATE TABLE characteristics
(
    id         INTEGER NOT NULL,
    char_name  VARCHAR(255),
    char_value VARCHAR(255),
    product_id INTEGER,
    CONSTRAINT pk_characteristics PRIMARY KEY (id)
);

CREATE TABLE contact_infos
(
    id         INTEGER NOT NULL,
    tel_number VARCHAR(255),
    email      VARCHAR(255),
    CONSTRAINT pk_contact_infos PRIMARY KEY (id)
);

CREATE TABLE copies
(
    id         INTEGER NOT NULL,
    code       VARCHAR(255),
    available  BOOLEAN,
    product_id INTEGER,
    order_id   INTEGER,
    CONSTRAINT pk_copies PRIMARY KEY (id)
);

CREATE TABLE orders
(
    id               INTEGER NOT NULL,
    order_status     VARCHAR(255),
    payment_method   VARCHAR(255),
    shipment_id      INTEGER,
    user_id          INTEGER,
    contact_info_id  INTEGER,
    address_id       INTEGER,
    code             VARCHAR(255),
    send_date        date,
    placement_date   TIMESTAMP WITHOUT TIME ZONE,
    additional_notes VARCHAR(255),
    CONSTRAINT pk_orders PRIMARY KEY (id)
);

CREATE TABLE products
(
    id          INTEGER NOT NULL,
    category_id INTEGER,
    name        VARCHAR(255),
    description VARCHAR(255),
    price       DOUBLE PRECISION,
    CONSTRAINT pk_products PRIMARY KEY (id)
);

CREATE TABLE roles
(
    id   INTEGER NOT NULL,
    name VARCHAR(255),
    CONSTRAINT pk_roles PRIMARY KEY (id)
);

CREATE TABLE shipments
(
    id    INTEGER NOT NULL,
    name  VARCHAR(255),
    price DOUBLE PRECISION,
    CONSTRAINT pk_shipments PRIMARY KEY (id)
);

CREATE TABLE users
(
    id              INTEGER NOT NULL,
    username        VARCHAR(255),
    firstname       VARCHAR(255),
    lastname        VARCHAR(255),
    password        VARCHAR(255),
    enabled         BOOLEAN NOT NULL,
    contact_info_id INTEGER,
    address_id      INTEGER,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE TABLE users_roles
(
    role_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    CONSTRAINT pk_users_roles PRIMARY KEY (role_id, user_id)
);

CREATE TABLE categories
(
    id                 INTEGER NOT NULL,
    name               VARCHAR(255),
    description        VARCHAR(255),
    parent_category_id INTEGER,
    CONSTRAINT pk_categories PRIMARY KEY (id)
);

ALTER TABLE categories
    ADD CONSTRAINT FK_CATEGORIES_ON_PARENT_CATEGORY FOREIGN KEY (parent_category_id) REFERENCES categories (id);

ALTER TABLE users
    ADD CONSTRAINT FK_USERS_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES addresses (id);

ALTER TABLE users
    ADD CONSTRAINT FK_USERS_ON_CONTACT_INFO FOREIGN KEY (contact_info_id) REFERENCES contact_infos (id);

ALTER TABLE users_roles
    ADD CONSTRAINT fk_userol_on_role FOREIGN KEY (role_id) REFERENCES roles (id);

ALTER TABLE users_roles
    ADD CONSTRAINT fk_userol_on_user FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE products
    ADD CONSTRAINT FK_PRODUCTS_ON_CATEGORY FOREIGN KEY (category_id) REFERENCES categories (id);

ALTER TABLE orders
    ADD CONSTRAINT uc_orders_code UNIQUE (code);

ALTER TABLE orders
    ADD CONSTRAINT FK_ORDERS_ON_ADDRESS FOREIGN KEY (address_id) REFERENCES addresses (id);

ALTER TABLE orders
    ADD CONSTRAINT FK_ORDERS_ON_CONTACT_INFO FOREIGN KEY (contact_info_id) REFERENCES contact_infos (id);

ALTER TABLE orders
    ADD CONSTRAINT FK_ORDERS_ON_SHIPMENT FOREIGN KEY (shipment_id) REFERENCES shipments (id);

ALTER TABLE orders
    ADD CONSTRAINT FK_ORDERS_ON_USER FOREIGN KEY (user_id) REFERENCES users (id);

ALTER TABLE copies
    ADD CONSTRAINT uc_copies_code UNIQUE (code);

ALTER TABLE copies
    ADD CONSTRAINT FK_COPIES_ON_ORDER FOREIGN KEY (order_id) REFERENCES orders (id);

ALTER TABLE copies
    ADD CONSTRAINT FK_COPIES_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES products (id);

ALTER TABLE contact_infos
    ADD CONSTRAINT uc_contact_infos_email UNIQUE (email);

ALTER TABLE contact_infos
    ADD CONSTRAINT uc_contact_infos_telnumber UNIQUE (tel_number);

ALTER TABLE characteristics
    ADD CONSTRAINT FK_CHARACTERISTICS_ON_PRODUCT FOREIGN KEY (product_id) REFERENCES products (id);