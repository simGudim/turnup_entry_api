pipeline {
    
    agent any
    
    environment {
        registry = "public.ecr.aws/n7o8b3g6/turnup"
    }
    
    stages {
        
        stage ('Checkout') {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[credentialsId: 'a50f77a9-8c04-4271-b3b2-99e42280c7e4', url: 'https://github.com/simGudim/turnup.git']]])
            }    
        }
        
        stage ('Docker Build') {
            steps {
                script {
                    dockerImage = docker.build registry
                }
            }
        }
        
        stage('Docker Push') {
            steps {
                script {
                    sh 'aws ecr get-login-password --region us-east-2 --profile simGudim2 | docker login --username AWS --password-stdin public.ecr.aws/n7o8b3g6/turnup'
                    sh 'docker push public.ecr.aws/n7o8b3g6/turnup:latest'
                }
            }
        }
        
    }
}