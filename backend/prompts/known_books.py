"""Known book and course chapter definitions for subject mapping."""

KNOWN_BOOK_CHAPTERS = {
    "indian polity": {
        "m. laxmikanth": """
ACTUAL CHAPTERS IN "Indian Polity" by M. Laxmikanth (6th Edition -- 36 Parts, 78 Chapters):
Part I -- Constitutional Framework:
1. Historical Background, 2. Making of the Constitution, 3. Salient Features of the Constitution, 4. Preamble of the Constitution, 5. Union and its Territory, 6. Citizenship
Part II -- Fundamental Rights, DPSPs, Duties:
7. Fundamental Rights, 8. Directive Principles of State Policy, 9. Fundamental Duties, 10. Amendment of the Constitution, 11. Basic Structure of the Constitution
Part III -- The Union Government:
12. Parliament -- Part 1, 13. Parliament -- Part 2 (Committees & Sessions), 14. Parliament -- Part 3 (Legislation & Procedures), 15. Prime Minister, 16. Central Council of Ministers, 17. Cabinet Committees, 18. President, 19. Vice-President, 20. Attorney General of India, 21. Cabinet Secretariat, 22. NITI Aayog
Part IV -- State Government:
23. State Executive (Governor), 24. Chief Minister & State Council of Ministers, 25. State Legislature, 26. High Court, 27. Subordinate Courts, 28. Advocate General of State
Part V -- Centre-State Relations:
29. Centre-State Legislative Relations, 30. Centre-State Administrative Relations, 31. Centre-State Financial Relations, 32. Interstate Relations, 33. Emergency Provisions
Part VI -- Local Government:
34. Panchayati Raj, 35. Municipalities, 36. Union Territories, 37. Scheduled & Tribal Areas
Part VII -- Constitutional Bodies:
38. Election Commission, 39. Union Public Service Commission, 40. State Public Service Commission, 41. Finance Commission, 42. National Commission for SCs, 43. National Commission for STs, 44. Special Officer for Linguistic Minorities, 45. Comptroller and Auditor General, 46. Attorney General
Part VIII -- Non-Constitutional Bodies:
47. NITI Aayog, 48. National Human Rights Commission, 49. State Human Rights Commission, 50. Central Vigilance Commission, 51. Central Bureau of Investigation, 52. Lokpal & Lokayuktas, 53. National Investigation Agency, 54. Central Information Commission
Part IX -- Other Provisions:
55. Official Language, 56. Public Services, 57. Tribunals, 58. Rights & Liabilities of Government, 59. Trade, Commerce and Intercourse, 60. Miscellaneous Provisions, 61. Temporary, Transitional and Special Provisions
Part X -- The Constitution and Social Order:
62. Voting Behaviour in India, 63. Coalition Government in India, 64. President's Rule, 65. National Emergency, 66. Financial Emergency
Part XI -- Working of Indian Democracy:
67. Election Laws, 68. Anti-Defection Law, 69. Committee System in Parliament, 70. Budget in Parliament
Part XII -- Appendices:
71. Comparison of Indian Constitution with others, 72. Schedules of Constitution, 73. Constitutional Articles & Their Provisions
""",
    },
    "bioinformatics algorithms": {
        "compeau & pevzner": """
ACTUAL CHAPTERS in "Bioinformatics Algorithms: An Active Learning Approach" by Compeau & Pevzner:
Chapter 1: Where in the Genome Does DNA Replication Begin? (Pattern matching, frequency arrays, skew diagrams, Clump Finding)
Chapter 2: Which DNA Patterns Play the Role of Molecular Clocks? (Hidden messages in Salmonella, Gibbs sampler, randomized motif search)
Chapter 3: How Do We Assemble Genomes? (String reconstruction, de Bruijn graphs, Eulerian paths, genome assembly from reads)
Chapter 4: How Do We Sequence Antibiotics? (Cyclopeptide sequencing, leaderboard, spectral convolution, branch and bound)
Chapter 5: How Do Mice Find Their Way Out of a Maze? (Dynamic programming, longest common subsequence, edit distance, alignment with gaps)
Chapter 6: Are There Fragile Regions in the Human Genome? (Synteny blocks, genome rearrangements, breakpoint graphs, 2-break sorting)
Chapter 7: Which Animal Gave Us SARS? (Distances between leaves, ultrametric trees, neighbor joining, small parsimony)
Chapter 8: How Did Yeast Become a Wine Maker? (Clustering, k-means, soft k-means, hierarchical clustering)
Chapter 9: How Do We Locate Disease-Causing Mutations? (Suffix trees, Burrows-Wheeler Transform, BWT compression, sequence alignment with BWT)
Chapter 10: Why Have Biologists Still Not Developed an HIV Vaccine? (Hidden Markov Models, Viterbi algorithm, Baum-Welch)
Chapter 11: Was T. Rex Just a Big Chicken? (Protein identification, peptide sequencing, spectral dictionaries, MS/MS)
""",
        "jones & pevzner": """
ACTUAL CHAPTERS in "An Introduction to Bioinformatics Algorithms" by Jones & Pevzner:
Chapter 1: Introduction to Computational Approaches in Biology
Chapter 2: Exhaustive Search -- Brute-force motif finding, regulatory sequences
Chapter 3: Greedy Algorithms -- Multiple genome alignment, motif finding
Chapter 4: Dynamic Programming -- Sequence alignment, LCS, gap penalties
Chapter 5: Divide and Conquer -- Merge sort, FFT, space-efficient alignment
Chapter 6: Graph Algorithms -- Sequence graphs, de Bruijn, Eulerian cycles, Hamiltonian paths
Chapter 7: Combinatorial Pattern Matching -- Exact/approximate matching, Boyer-Moore, suffix trees
Chapter 8: Clustering and Trees -- Hierarchical clustering, UPGMA, Neighbor-joining
Chapter 9: Hidden Markov Models -- CpG islands, gene finding, protein families
Chapter 10: Randomized Algorithms -- Monte Carlo methods, Las Vegas algorithms, Gibbs sampling
""",
    },
    "machine learning": {
        "christopher bishop": """
ACTUAL CHAPTERS in "Pattern Recognition and Machine Learning" by Bishop:
Chapter 1: Introduction (Polynomial curve fitting, probability theory, Bayesian curve fitting, model selection, curse of dimensionality, decision theory, information theory)
Chapter 2: Probability Distributions (Binary variables, multinomial, Gaussian, exponential family, nonparametric methods, kernel density estimation, nearest-neighbor)
Chapter 3: Linear Models for Regression (Linear basis function models, bias-variance decomposition, Bayesian linear regression, evidence approximation, limits of fixed basis functions)
Chapter 4: Linear Models for Classification (Discriminant functions, probabilistic generative models, probabilistic discriminative models, Laplace approximation, Bayesian logistic regression)
Chapter 5: Neural Networks (Feed-forward networks, network training, backpropagation, regularization, mixture density networks, Bayesian neural networks)
Chapter 6: Kernel Methods (Dual representations, constructing kernels, radial basis function networks, Gaussian processes for regression, Gaussian processes for classification)
Chapter 7: Sparse Kernel Machines (Maximum margin classifiers, relation to logistic regression, SVM for regression, relevance vector machine)
Chapter 8: Graphical Models (Bayesian networks, conditional independence, Markov random fields, inference in graphical models, loop belief propagation, learning graphical models)
Chapter 9: Mixture Models and EM (K-means, mixtures of Gaussians, EM algorithm, evidence lower bound, generalised EM, mixtures of Bernoullis)
Chapter 10: Approximate Inference (Variational inference, illustration: variational mixture of Gaussians, variational linear regression, exponential family, local variational methods)
Chapter 11: Sampling Methods (Basic sampling algorithms, Markov chain Monte Carlo, Gibbs sampling, slice sampling, hybrid Monte Carlo, estimating partition functions)
Chapter 12: Continuous Latent Variables (Principal component analysis, probabilistic PCA, kernel PCA, nonlinear latent variable models)
Chapter 13: Sequential Data (Hidden Markov models, linear dynamical systems, particle filters)
Chapter 14: Combining Models (Bayesian model averaging, committees, boosting, tree-based models, conditional mixture models)
""",
        "goodfellow bengio courville": """
ACTUAL CHAPTERS in "Deep Learning" by Goodfellow, Bengio & Courville:
Part I -- Applied Math and Machine Learning Basics:
Chapter 1: Introduction
Chapter 2: Linear Algebra (Scalars, vectors, matrices, tensors, eigendecomposition, SVD, PCA, Moore-Penrose pseudoinverse)
Chapter 3: Probability and Information Theory (distributions, Bayes rule, common distributions, technical details, information theory)
Chapter 4: Numerical Computation (overflow/underflow, gradient descent, Lagrange multipliers, constrained optimization)
Chapter 5: Machine Learning Basics (learning algorithms, bias-variance, MLE, Bayesian statistics, supervised/unsupervised learning)
Part II -- Deep Networks: Modern Practices:
Chapter 6: Deep Feedforward Networks (gradient descent, backpropagation, historical notes)
Chapter 7: Regularization (parameter norms, dataset augmentation, noise robustness, semi-supervised, multitask, early stopping, dropout, ensemble)
Chapter 8: Optimization for Training Deep Models (challenges, basic algorithms, adaptive learning rates, second-order methods, batch normalization)
Chapter 9: Convolutional Networks (convolution operation, motivation, pooling, variants, efficient algorithms, random or unsupervised features)
Chapter 10: Sequence Modeling: Recurrent and Recursive Nets (unfolding, RNN, bidirectional, encoder-decoder, deep RNN, LSTM, gated units, echo state)
Chapter 11: Practical Methodology (performance metrics, default baseline, debugging strategies)
Chapter 12: Applications (large-scale deep learning, computer vision, speech, NLP, other modalities)
Part III -- Deep Learning Research:
Chapter 13: Linear Factor Models (PPCA, ICA, sparse coding, manifold interpretation)
Chapter 14: Autoencoders (undercomplete, regularized, variational, contractive, predictive)
Chapter 15: Representation Learning (greedy layer-wise unsupervised pretraining, transfer learning, domain adaptation, distributed representations, exponential gains)
Chapter 16: Structured Probabilistic Models (graphical models, sampling, Markov networks, partition function, deep belief networks)
Chapter 17: Monte Carlo Methods (sampling, importance sampling, Markov chain Monte Carlo, Gibbs sampling)
Chapter 18: Confronting the Partition Function (log-likelihood gradient, stochastic maximum likelihood, contrastive divergence, score matching, ratio matching, noise-contrastive estimation)
Chapter 19: Approximate Inference (inference as optimization, MAP, variational inference, learned inference)
Chapter 20: Deep Generative Models (Boltzmann machines, restricted Boltzmann machines, deep belief networks, deep Boltzmann machines, variational autoencoders, GANs, autoregressive models)
""",
    },
    "jee mathematics": {
        "arihant": """
ACTUAL TOPICS in Arihant "Skills in Mathematics" JEE Series:
Algebra: Complex Numbers and Quadratic Equations, Sequences and Series, Permutations and Combinations, Binomial Theorem, Matrices and Determinants, Probability
Calculus: Functions, Limits Continuity and Differentiability, Differentiation, Applications of Derivatives (maxima/minima, tangent/normal, Mean Value Theorems), Indefinite Integration, Definite Integration, Area Under Curves, Differential Equations
Trigonometry: Trigonometric Functions, Trigonometric Equations, Properties and Solutions of Triangles, Inverse Trigonometric Functions
Coordinate Geometry: Straight Lines, Circle, Parabola, Ellipse, Hyperbola, Three-Dimensional Geometry
Vectors: Vector Algebra, Vector operations, Dot product, Cross product, Applications in 3D geometry
Statistics and Mathematical Reasoning: Statistics (mean, variance, standard deviation), Mathematical Reasoning (statements, truth tables, quantifiers)
""",
    },
    "nptel bioinformatics": {
        "iit madras": """
ACTUAL MODULES in "Algorithmic Thinking in Bioinformatics" -- IIT Madras NPTEL Course:
Week 1: Introduction to Computational Biology -- DNA structure, replication, biological databases
Week 2: Pattern Matching -- Exact pattern matching, frequency arrays, finding Ori, Clump finding problem
Week 3: Motif Finding -- Brute force motif finding, median string, profile matrices, scoring motifs
Week 4: Randomized Algorithms -- Randomized motif search, Gibbs sampler, convergence
Week 5: String Reconstruction & Genome Assembly -- String reconstruction from reads, overlap graphs
Week 6: De Bruijn Graphs -- De Bruijn graph construction, Eulerian paths, genome assembly algorithm
Week 7: Sequence Alignment I -- Edit distance, global alignment (Needleman-Wunsch), scoring matrices
Week 8: Sequence Alignment II -- Local alignment (Smith-Waterman), affine gap penalties, BLAST
Week 9: Antibiotic Sequencing -- Mass spectrometry, cyclopeptide sequencing, branch-and-bound
Week 10: Genome Rearrangements -- Synteny blocks, 2-break sorting, breakpoint graphs
Week 11: Phylogenetic Trees -- Distance-based methods, UPGMA, Neighbor-joining algorithm, Parsimony
Week 12: Clustering Algorithms -- k-means, soft k-means, hierarchical clustering for transcriptomics
Week 13: Hidden Markov Models -- CpG islands, Viterbi algorithm, parameter estimation
Week 14: Applications -- Gene finding, protein families, HMMER, final project
""",
    },
}


def _get_known_chapters(book_name: str, subject: str) -> str:
    """Look up pre-defined chapter lists for known books."""
    if not book_name:
        return ""
    bn = book_name.lower()
    subj = subject.lower()

    for subj_key, books in KNOWN_BOOK_CHAPTERS.items():
        if subj_key in subj or subj in subj_key:
            for author_key, chapters in books.items():
                if any(word in bn for word in author_key.split()):
                    return chapters

    for subj_key, books in KNOWN_BOOK_CHAPTERS.items():
        if any(word in bn for word in subj_key.split() if len(word) > 3):
            for author_key, chapters in books.items():
                if any(word in bn for word in author_key.split() if len(word) > 3):
                    return chapters

    return ""
