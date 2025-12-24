pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME = 'hindaitalla'

        BACKEND_IMAGE = 'hindaitalla/flask-backend'
        FRONTEND_IMAGE = 'hindaitalla/react-frontend'
    }

    stages {

        stage('Checkout Source Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/hind-aitalla/react-flask-mongodb-devops.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                docker build -t react-flask-mongodb-v1-backend ./backend
                docker build -t react-flask-mongodb-v1-frontend ./frontend

                docker tag react-flask-mongodb-v1-backend $BACKEND_IMAGE:latest
                docker tag react-flask-mongodb-v1-frontend $FRONTEND_IMAGE:latest
                '''
            }
        }

        stage('Docker Hub Login') {
            steps {
                sh '''
                echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                '''
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                sh '''
                docker push $BACKEND_IMAGE:latest
                docker push $FRONTEND_IMAGE:latest
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline exécuté avec succès – Images pushées sur Docker Hub'
        }
        failure {
            echo '❌ Échec du pipeline – Vérifiez la console Jenkins'
        }
    }
}

