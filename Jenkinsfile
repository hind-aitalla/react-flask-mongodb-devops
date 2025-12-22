pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "reactflaskmongo"
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/hind-aitalla/react-flask-mongodb-devops.git'
            }
        }

        stage('Show Docker Versions') {
            steps {
                sh '''
                  echo "=== Docker version ==="
                  docker --version

                  echo "=== Docker Compose version ==="
                  docker-compose --version
                '''
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh '''
                  echo "=== Stop old containers ==="
                  docker-compose down --remove-orphans || true
                '''
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                  echo "=== Build images ==="
                  docker-compose build
                '''
            }
        }

        stage('Run Application') {
            steps {
                sh '''
                  echo "=== Start containers ==="
                  docker-compose up -d
                '''
            }
        }

        stage('Check Running Containers') {
            steps {
                sh '''
                  echo "=== Running containers ==="
                  docker ps
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès – Application lancée'
        }
        failure {
            echo '❌ Échec du pipeline – Vérifie les logs'
        }
        always {
            echo '📦 Fin du pipeline'
        }
    }
}
