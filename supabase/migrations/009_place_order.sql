create or replace function place_order(input jsonb, customer_id uuid default null) returns jsonb
language plpgsql security definer as $$
declare line jsonb; variant record; order_id uuid; subtotal integer := 0; delivery integer := 8000;
begin
  insert into orders (user_id, customer_name, phone, address, subtotal_poisha, delivery_poisha, total_poisha)
  values (customer_id, input->>'name', input->>'phone', input, 0, delivery, delivery) returning id into order_id;
  for line in select * from jsonb_array_elements(input->'lines') loop
    select * into variant from product_variants where id = (line->>'variantId')::uuid for update;
    if variant.stock < (line->>'quantity')::integer then raise exception 'insufficient stock'; end if;
    update product_variants set stock = stock - (line->>'quantity')::integer where id = variant.id;
    subtotal := subtotal + variant.price_poisha * (line->>'quantity')::integer;
    insert into order_items (order_id, variant_id, name, quantity, price_poisha) values (order_id, variant.id, variant.sku, (line->>'quantity')::integer, variant.price_poisha);
  end loop;
  update orders set subtotal_poisha = subtotal, total_poisha = subtotal + delivery where id = order_id;
  insert into payments (order_id, method) values (order_id, coalesce(input->>'paymentMethod', 'cod'));
  insert into order_events (order_id, status, note) values (order_id, 'pending', 'Order received');
  return jsonb_build_object('id', order_id);
end; $$;
