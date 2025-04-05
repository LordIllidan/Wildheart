FROM rabbitmq:3-management-alpine

# Add custom configuration
COPY ./rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

# Set environment variables
ENV RABBITMQ_DEFAULT_USER=wildheart
ENV RABBITMQ_DEFAULT_PASS=wildheart

# Expose ports
EXPOSE 5672 15672

# Start RabbitMQ with management plugin
CMD ["rabbitmq-server"] 