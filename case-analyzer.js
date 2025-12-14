// Advanced Case Analyzer
class CaseAnalyzer {
    constructor() {
        this.phases = {
            investigacao: {
                title: 'FASE INVESTIGATIVA',
                strategies: [
                    {
                        title: 'DEFESA PREVENTIVA',
                        description: 'Atuação para evitar o oferecimento da denúncia através de alegações finais robustas.',
                        priority: 'ALTA',
                        time: '48H',
                        actions: [
                            'Análise completa do inquérito',
                            'Elaboração de alegações finais',
                            'Identificação de vícios formais'
                        ]
                    }
                ]
            },
            instancia: {
                title: '1ª INSTÂNCIA',
                strategies: [
                    {
                        title: 'DEFESA TÁTICA',
                        description: 'Estratégia focada em nulidades processuais e redução de pena-base.',
                        priority: 'MÉDIA',
                        time: '72H',
                        actions: [
                            'Contraditório amplo',
                            'Impugnação de provas',
                            'Plea bargain estratégico'
                        ]
                    }
                ]
            },
            recursos: {
                title: 'FASE RECURSAL',
                strategies: [
                    {
                        title: 'APELAÇÃO ESTRATÉGICA',
                        description: 'Foco em vícios de julgamento e novas teses defensivas.',
                        priority: 'ALTA',
                        time: '120H',
                        actions: [
                            'Revisão acurada da sentença',
                            'Identificação de fundamentação deficiente',
                            'Preparação de recursos especiais'
                        ]
                    }
                ]
            }
        };

        this.gravityLevels = {
            baixa: {
                title: 'ATÉ 4 ANOS',
                strategies: [
                    {
                        title: 'SUSPENSÃO CONDICIONAL',
                        description: 'Busca pela aplicação do art. 77 do CP.',
                        priority: 'MÉDIA',
                        time: '30D'
                    }
                ]
            },
            media: {
                title: '4-8 ANOS',
                strategies: [
                    {
                        title: 'REDUÇÃO DE PENA-BASE',
                        description: 'Trabalho focado em atenuantes e causas de diminuição.',
                        priority: 'ALTA',
                        time: '60D'
                    }
                ]
            },
            alta: {
                title: 'ACIMA DE 8 ANOS',
                strategies: [
                    {
                        title: 'CONTROLE DE DANOS',
                        description: 'Estratégia agressiva para evitar regime fechado inicial.',
                        priority: 'MÁXIMA',
                        time: 'URGENTE'
                    }
                ]
            }
        };

        this.urgencyLevels = {
            baixa: {
                title: 'PLANEJAMENTO',
                responseTime: '5 DIAS ÚTEIS'
            },
            media: {
                title: 'PRAZOS EM CURSO',
                responseTime: '48 HORAS'
            },
            alta: {
                title: 'EMERGÊNCIA',
                responseTime: 'ATÉ 6 HORAS'
            }
        };
    }

    analyze(answers) {
        const analysis = {
            id: this.generateCaseId(),
            date: new Date().toISOString(),
            phase: this.phases[answers.phase],
            gravity: this.gravityLevels[answers.gravity],
            urgency: this.urgencyLevels[answers.urgency],
            recommendations: [],
            estimatedTimeline: [],
            riskAssessment: this.assessRisk(answers)
        };

        // Generate recommendations
        analysis.recommendations = this.generateRecommendations(answers);
        
        // Generate timeline
        analysis.estimatedTimeline = this.generateTimeline(answers);
        
        // Calculate success probability
        analysis.successProbability = this.calculateSuccessProbability(answers);
        
        return analysis;
    }

    generateRecommendations(answers) {
        const recommendations = [];
        
        // Phase-based recommendations
        if (answers.phase === 'investigacao') {
            recommendations.push({
                type: 'PREVENTIVE',
                title: 'AÇÃO IMEDIATA NA INVESTIGAÇÃO',
                items: [
                    'Solicitar vistas do inquérito',
                    'Apresentar alegações finais robustas',
                    'Propor arquivamento com fundamentação técnica'
                ],
                deadline: 'URGENTE'
            });
        }
        
        // Gravity-based recommendations
        if (answers.gravity === 'alta') {
            recommendations.push({
                type: 'CRITICAL',
                title: 'ESTRATÉGIA DE REDUÇÃO DE RISCO',
                items: [
                    'Preparação de recursos preventivos',
                    'Estudo de teses de descaracterização',
                    'Plano de negociação estratégica'
                ],
                deadline: '48H'
            });
        }
        
        // Urgency-based recommendations
        if (answers.urgency === 'alta') {
            recommendations.push({
                type: 'EMERGENCY',
                title: 'PROTOCOLO DE EMERGÊNCIA',
                items: [
                    'Contato imediato com o juízo',
                    'Preparação de medidas cautelares',
                    'Atendimento prioritário 24/7'
                ],
                deadline: 'IMEDIATO'
            });
        }
        
        // Default recommendations
        recommendations.push({
            type: 'STANDARD',
            title: 'ANÁLISE FORENSE COMPLETA',
            items: [
                'Revisão de 360° do processo',
                'Identificação de nulidades absolutas',
                'Mapa estratégico de defesa'
            ],
            deadline: '7 DIAS'
        });
        
        return recommendations;
    }

    generateTimeline(answers) {
        const timeline = [];
        const today = new Date();
        
        // Immediate actions (first 48 hours)
        timeline.push({
            phase: 'AÇÕES IMEDIATAS',
            start: today,
            end: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
            tasks: [
                'Análise preliminar do caso',
                'Identificação de prazos urgentes',
                'Contato inicial com cliente'
            ]
        });
        
        // Strategic planning (first week)
        timeline.push({
            phase: 'PLANEJAMENTO ESTRATÉGICO',
            start: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000),
            end: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
            tasks: [
                'Desenvolvimento de teses defensivas',
                'Preparação de peças iniciais',
                'Definição de estratégia de negociação'
            ]
        });
        
        // Execution phase (first month)
        timeline.push({
            phase: 'EXECUÇÃO TÁTICA',
            start: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
            end: new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000),
            tasks: [
                'Protocolo de peças',
                'Atuação em audiências',
                'Acompanhamento processual'
            ]
        });
        
        return timeline;
    }

    assessRisk(answers) {
        let riskScore = 0;
        const factors = [];
        
        // Phase risk
        if (answers.phase === 'recursos') {
            riskScore += 30;
            factors.push('Fase recursal avançada');
        }
        
        // Gravity risk
        if (answers.gravity === 'alta') {
            riskScore += 40;
            factors.push('Potencial de pena elevado');
        } else if (answers.gravity === 'media') {
            riskScore += 20;
            factors.push('Pena média');
        }
        
        // Urgency risk
        if (answers.urgency === 'alta') {
            riskScore += 30;
            factors.push('Urgência máxima');
        } else if (answers.urgency === 'media') {
            riskScore += 15;
            factors.push('Prazos em curso');
        }
        
        return {
            score: riskScore,
            level: this.getRiskLevel(riskScore),
            factors: factors,
            mitigation: this.getRiskMitigation(riskScore)
        };
    }

    getRiskLevel(score) {
        if (score >= 70) return 'CRÍTICO';
        if (score >= 50) return 'ALTO';
        if (score >= 30) return 'MÉDIO';
        return 'BAIXO';
    }

    getRiskMitigation(score) {
        if (score >= 70) {
            return [
                'Atuação imediata requerida',
                'Recursos preventivos necessários',
                'Monitoramento 24/7'
            ];
        } else if (score >= 50) {
            return [
                'Planejamento estratégico urgente',
                'Foco em redução de danos',
                'Acompanhamento intensivo'
            ];
        } else if (score >= 30) {
            return [
                'Análise detalhada',
                'Estratégia defensiva padrão',
                'Acompanhamento regular'
            ];
        } else {
            return [
                'Análise preventiva',
                'Orientação estratégica',
                'Monitoramento básico'
            ];
        }
    }

    calculateSuccessProbability(answers) {
        let probability = 70; // Base probability
        
        // Adjust based on phase
        if (answers.phase === 'investigacao') probability += 15;
        if (answers.phase === 'recursos') probability -= 10;
        
        // Adjust based on gravity
        if (answers.gravity === 'baixa') probability += 10;
        if (answers.gravity === 'alta') probability -= 20;
        
        // Adjust based on urgency
        if (answers.urgency === 'baixa') probability += 5;
        if (answers.urgency === 'alta') probability -= 15;
        
        // Ensure within bounds
        return Math.max(10, Math.min(95, probability));
    }

    generateCaseId() {
        const prefix = 'SD';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substr(2, 4).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    }

    generateReport(analysis) {
        return {
            header: {
                caseId: analysis.id,
                analysisDate: new Date(analysis.date).toLocaleDateString('pt-BR'),
                clientCode: `CLI-${Math.random().toString(36).substr(2, 6).toUpperCase()}`
            },
            executiveSummary: this.generateExecutiveSummary(analysis),
            detailedAnalysis: {
                phaseAnalysis: analysis.phase,
                gravityAssessment: analysis.gravity,
                urgencyAssessment: analysis.urgency,
                riskAssessment: analysis.riskAssessment
            },
            strategicRecommendations: analysis.recommendations,
            actionPlan: {
                timeline: analysis.estimatedTimeline,
                nextSteps: this.generateNextSteps(analysis),
                successProbability: `${analysis.successProbability}%`
            },
            disclaimer: 'Esta análise é preliminar e não substitui consulta jurídica detalhada.'
        };
    }

    generateExecutiveSummary(analysis) {
        return {
            overview: `Análise estratégica para caso ${analysis.id}`,
            keyFindings: [
                `Fase processual: ${analysis.phase.title}`,
                `Nível de risco: ${analysis.riskAssessment.level}`,
                `Probabilidade de sucesso: ${analysis.successProbability}%`
            ],
            criticalActions: analysis.recommendations
                .filter(r => r.type === 'CRITICAL' || r.type === 'EMERGENCY')
                .map(r => r.title)
        };
    }

    generateNextSteps(analysis) {
        const steps = [];
        
        if (analysis.urgency === 'alta') {
            steps.push({
                action: 'CONTATO IMEDIATO',
                deadline: 'HOJE',
                responsible: 'DR. REGINALDO OLIVEIRA'
            });
        }
        
        steps.push({
            action: 'AGENDAMENTO DE CONSULTA ESTRATÉGICA',
            deadline: '48H',
            responsible: 'EQUIPE JURÍDICA'
        });
        
        steps.push({
            action: 'ANÁLISE DOCUMENTAL COMPLETA',
            deadline: '7 DIAS',
            responsible: 'ANALISTA SÊNIOR'
        });
        
        return steps;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CaseAnalyzer;
}
